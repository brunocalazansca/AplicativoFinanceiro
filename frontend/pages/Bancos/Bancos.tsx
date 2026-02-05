import { styles } from './BancosStyle';
import { ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/Button/Button";
import AdditionModal from "@/components/AdditionModal/AdditionModal";
import BankCard from "@/components/BankCard/BankCard";
import {useCallback, useEffect, useState} from "react";
import {router, useFocusEffect} from "expo-router";
import { getSession } from "@/storage/authStorage";
import { cadastrarBanco, listarBancos } from "@/services/bancoService";
import { setToken } from "@/api/authToken";
import { FeedbackState } from "@/_utils/typeFeedback";
import FeedbackModal from "@/components/FeedbackModal/FeedbackModal";
import { BancoApi } from "@/_utils/typeBancoApi";

export default function Bancos() {
    const [open, setOpen] = useState(false);
    const [session, setSession] = useState<Awaited<ReturnType<typeof getSession>>>(null);
    const [feedback, setFeedback] = useState<FeedbackState | null>(null);
    const [bancos, setBancos] = useState<BancoApi[]>([]);

    async function loadBancos() {
        try {
            const data = await listarBancos();
            setBancos(data);
        } catch (err: any) {
            console.log("Erro ao listar bancos:", err?.message ?? err);
        }
    }

    useFocusEffect(
        useCallback(() => {
            let active = true;

            (async () => {
                const s = await getSession();
                if (!active) return;

                setSession(s);
                await setToken(s?.token ?? null);

                if (s?.token) {
                    await loadBancos();
                }
            })();

            return () => {
                active = false;
            };
        }, [])
    );

    useEffect(() => {
        if (!feedback) return;

        const t = setTimeout(() => {
            setFeedback(null);
        }, 2500);

        return () => clearTimeout(t);
    }, [feedback]);

    async function handleAddBanco({ name, color }: { name: string; color: string }) {
        try {
            if (!session?.token) {
                setFeedback({
                    title: "Sessão expirada!",
                    description: "Faça login novamente."
                });

                return;
            }

            const novoBanco = await cadastrarBanco(name, color,);

            setBancos((prev) => [novoBanco, ...prev]);

            setFeedback({
                title: `${novoBanco.nome} cadastrado com sucesso!`,
            });

            setOpen(false);

        } catch (err: any) {
            const status = err?.response?.status;

            if (status === 409) {
                setFeedback({ title: "Este banco já está cadastrado." });
                return;
            }

            const msg =
                err?.response?.data?.message ??
                err?.message ??
                String(err);

            setFeedback({ title: `Erro ao cadastrar banco: ${msg}` });
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="#FFFFFF"
                translucent={false}
            />
            <View style={styles.buttonContainer}>
                <Text style={styles.countText}>
                    {bancos.length > 1 ? `${bancos.length} bancos` : `${bancos.length} banco`}
                </Text>

                <Button
                    title="Banco"
                    onPress={() => setOpen(true)}
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
                        onDelete={() => console.log("Excluir banco")}
                        style={styles.card}
                    />
                ))}
            </ScrollView>

            <AdditionModal
                title="Banco"
                placeholder="Ex: Nubank, Itaú..."
                descricao="do Banco"
                visible={open}
                onClose={() => setOpen(false)}
                onAdd={handleAddBanco}
            />

            <FeedbackModal
                visible={!!feedback}
                title={feedback?.title ?? ""}
                description={feedback?.description ?? ""}
                onClose={() => setFeedback(null)}
            />
        </SafeAreaView>
    )
}