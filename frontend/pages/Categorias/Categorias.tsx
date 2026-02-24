import { styles } from './CategoriasStyle';
import {StatusBar, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import CardCategoria from "@/pages/Categorias/_components/CardCategoria";
import Button from "@/components/Button/Button";
import { useCallback, useState } from "react";
import AdditionModal from "@/components/AdditionModal/AdditionModal";
import { useHandleCategoria } from "@/handle/categoriaHandle";
import { useFocusEffect } from "expo-router";
import FeedbackModal from "@/components/FeedbackModal/FeedbackModal";
import ConfirmModal from "@/components/Modal/ConfirmModal";

export default function Categorias() {
    const [openAdd, setOpenAdd] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [categoriaId, setcategoriaId] = useState<number | null>(null);
    const {
        categoria,
        feedback,
        setFeedback,
        initCategoria,
        addCategoria,
        deleteCategoria
    } = useHandleCategoria();

    useFocusEffect(
        useCallback(() => {
            initCategoria();
        }, [initCategoria])
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
                    {categoria.length === 0
                        ? "Nenhuma categoria cadastrada"
                        : `${categoria.length} categoria${categoria.length === 1 ? "" : "s"}`}
                </Text>

                <Button
                    title="Categoria"
                    onPress={() => setOpenAdd(true)}
                    iconName="plus"
                    iconSize={24}
                    style={styles.button}
                />
            </View>

            <View style={styles.cardContainer}>
                {categoria.map((c) =>
                    <CardCategoria
                        key={String(c.id)}
                        title={c.nome}
                        iconColor={c.corHex}
                        onDelete={() => {
                            setcategoriaId(c.id);
                            setOpenConfirm(true);
                        }}
                    />
                )}
            </View>

            <AdditionModal
                title="Categoria"
                placeholder="Ex: Gasolina, Mercado..."
                descricao="da Categoria"
                visible={openAdd}
                onClose={() => setOpenAdd(false)}
                onAdd={async (payload) => {
                    const created = await addCategoria(payload);
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
                message="Tem certeza que deletar esta categoria?"
                onClose={() => setOpenConfirm(false)}
                onConfirm={async () => {
                    if (categoriaId != null) await deleteCategoria(categoriaId);
                    setcategoriaId(null);
                    setOpenConfirm(false);
                }}
                onCancel={() => {
                    setcategoriaId(null);
                    setOpenConfirm(false);
                }}
            />
        </SafeAreaView>
    )
}