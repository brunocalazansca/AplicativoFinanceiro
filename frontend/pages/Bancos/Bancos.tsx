import { styles } from './BancosStyle';
import { ScrollView, StatusBar, Text, View } from "react-native";
import { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useFocusEffect } from "expo-router";
import Button from "@/components/Button/Button";
import AdditionModal from "@/components/AdditionModal/AdditionModal";
import BankCard from "@/components/BankCard/BankCard";
import FeedbackModal from "@/components/FeedbackModal/FeedbackModal";
import ConfirmModal from "@/components/Modal/ConfirmModal";
import { useHandleBancos } from "@/handle/bancosHandle";

export default function Bancos() {
    const [openAdd, setOpenAdd] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [bancoId, setBancoId] = useState<number | null>(null);
    const {
        bancos,
        feedback,
        setFeedback,
        initBanco,
        addBanco,
        deleteBanco
    } = useHandleBancos();

    useFocusEffect(
        useCallback(() => {
            initBanco();
        }, [initBanco])
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="#FFFFFF"
                translucent={false}
            />
            <View style={styles.buttonContainer}>
                <Text style={styles.countText}>
                    {bancos.length === 0
                        ? "Nenhum banco cadastrado"
                        : `${bancos.length} banco${bancos.length === 1 ? "" : "s"}`}
                </Text>

                <Button
                    title="Banco"
                    onPress={() => setOpenAdd(true)}
                    iconName="plus"
                    iconSize={24}
                    style={styles.button}
                />
            </View>

            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={styles.cardsContainer}
                showsVerticalScrollIndicator={false}
            >
                {bancos.map((b) => (
                    <BankCard
                        key={String(b.id)}
                        name={b.nome}
                        amount={Number(b.saldo)}
                        transactionsCount={b.qtdTransacoes}
                        color={b.corHex}
                        onPress={() =>
                            router.push({
                                pathname: "/bancos/[nome]",
                                params: { nome: b.nome },
                            })
                        }
                        onDelete={() => {
                            setBancoId(b.id);
                            setOpenConfirm(true);
                        }}
                        style={styles.card}
                    />
                ))}
            </ScrollView>

            <AdditionModal
                title="Banco"
                placeholder="Ex: Nubank, Itaú..."
                descricao="do Banco"
                visible={openAdd}
                onClose={() => setOpenAdd(false)}
                onAdd={async (payload) => {
                    const created = await addBanco(payload);
                    if (created) setOpenAdd(false);
                }}
            />

            <FeedbackModal
                visible={!!feedback}
                title={feedback?.title ?? ""}
                description={feedback?.description ?? ""}
                onClose={() => setFeedback(null)}
            />

            <ConfirmModal
                visible={openConfirm}
                message="Tem certeza que deletar este banco?"
                onClose={() => setOpenConfirm(false)}
                onConfirm={async () => {
                    if (bancoId != null) await deleteBanco(bancoId);
                    setBancoId(null);
                    setOpenConfirm(false);
                }}
                onCancel={() => {
                    setBancoId(null);
                    setOpenConfirm(false);
                }}
            />
        </SafeAreaView>
    )
}