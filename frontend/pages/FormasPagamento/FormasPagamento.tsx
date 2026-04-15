import { styles } from './FormasPagamentoStyle';
import { StatusBar, Text, View, Modal, Pressable, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useHandleFormaPagamento } from "@/handle/formaPagamentoHandle";
import CardCategoria from "@/pages/Categorias/_components/CardCategoria";
import ConfirmModal from "@/components/Modal/ConfirmModal";
import FeedbackModal from "@/components/FeedbackModal/FeedbackModal";
import Button from "@/components/Button/Button";

export default function FormasPagamento() {
    const { formaPagamento, feedback, setFeedback, initFormaPagamento, deleteForma, updateForma } = useHandleFormaPagamento();

    const [openConfirm, setOpenConfirm] = useState(false);
    const [formaId, setFormaId] = useState<number | null>(null);

    const [openEdit, setOpenEdit] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);
    const [editNome, setEditNome] = useState('');
    const [salvando, setSalvando] = useState(false);

    useFocusEffect(
        useCallback(() => {
            initFormaPagamento();
        }, [initFormaPagamento])
    );

    const handleOpenEdit = (id: number, nome: string) => {
        setEditId(id);
        setEditNome(nome);
        setOpenEdit(true);
    };

    const handleSalvar = async () => {
        if (!editId || !editNome.trim()) return;
        setSalvando(true);
        const result = await updateForma(editId, editNome.trim());
        setSalvando(false);
        if (result) setOpenEdit(false);
    };

    const formasFiltradas = formaPagamento.filter(f => f.usuarioId !== null && f.nome !== 'Outro');

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent={false} />

            <View style={styles.buttonContainer}>
                <Text style={styles.countText}>
                    {formasFiltradas.length === 0
                        ? 'Nenhuma forma cadastrada'
                        : `${formasFiltradas.length} forma${formasFiltradas.length === 1 ? '' : 's'}`}
                </Text>
            </View>

            <View style={styles.cardContainer}>
                {formasFiltradas.map((f) => (
                    <CardCategoria
                        key={String(f.id)}
                        title={f.nome}
                        iconColor={f.corHex}
                        onPress={() => handleOpenEdit(f.id, f.nome)}
                        onDelete={() => {
                            setFormaId(f.id);
                            setOpenConfirm(true);
                        }}
                    />
                ))}
            </View>

            <Modal visible={openEdit} transparent animationType="fade" onRequestClose={() => setOpenEdit(false)}>
                <TouchableWithoutFeedback onPress={() => setOpenEdit(false)}>
                    <View style={styles.backdrop}>
                        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.center}>
                            <TouchableWithoutFeedback>
                                <View style={styles.card}>
                                    <View style={styles.modalHeader}>
                                        <Text style={styles.modalTitle}>Editar Forma de Pagamento</Text>
                                        <Pressable onPress={() => setOpenEdit(false)} hitSlop={10}>
                                            <Feather name="x" size={20} color="#111827" />
                                        </Pressable>
                                    </View>

                                    <Text style={styles.label}>Nome</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={editNome}
                                        onChangeText={setEditNome}
                                        placeholder="Nome da forma de pagamento"
                                        placeholderTextColor="#9CA3AF"
                                    />

                                    <Button
                                        title="Salvar"
                                        onPress={handleSalvar}
                                        loading={salvando}
                                        disabled={!editNome.trim() || salvando}
                                        style={styles.saveButton}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                        </KeyboardAvoidingView>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <ConfirmModal
                visible={openConfirm}
                message="Tem certeza que deseja deletar esta forma de pagamento?"
                onClose={() => setOpenConfirm(false)}
                onConfirm={async () => {
                    if (formaId != null) await deleteForma(formaId);
                    setFormaId(null);
                    setOpenConfirm(false);
                }}
                onCancel={() => {
                    setFormaId(null);
                    setOpenConfirm(false);
                }}
            />

            <FeedbackModal
                visible={!!feedback}
                title={feedback?.title ?? ''}
                description={feedback?.description ?? ''}
                onClose={() => setFeedback(null)}
            />
        </SafeAreaView>
    );
}
