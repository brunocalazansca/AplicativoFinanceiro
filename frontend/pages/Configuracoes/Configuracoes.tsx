import { styles } from './ConfiguracoesStyle';
import { StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/Button/Button";
import { useState } from "react";
import { excluirConta } from "@/services/userService";
import { router } from "expo-router";
import ConfirmModal from "@/components/Modal/ConfirmModal";
import FeedbackModal from "@/components/FeedbackModal/FeedbackModal";

export default function Configuracoes() {
    const [modalConfirmar, setModalConfirmar] = useState(false);
    const [sucesso, setSucesso] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleExcluirConta = async () => {
        if (loading) return;
        setLoading(true);
        try {
            await excluirConta();
            setModalConfirmar(false);
            setSucesso(true);
            setTimeout(() => {
                setSucesso(false);
                router.replace('/login');
            }, 2500);
        } catch {
            setLoading(false);
            setModalConfirmar(false);
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            <View style={styles.content}>
                <Button
                    title="Excluir conta"
                    onPress={() => setModalConfirmar(true)}
                    style={styles.deleteBtn}
                    textColor="#FF3B30"
                />
            </View>

            <ConfirmModal
                visible={modalConfirmar}
                message={loading ? 'Excluindo...' : 'Tem certeza que deseja excluir sua conta? Todos os seus dados serão permanentemente removidos.'}
                onClose={() => setModalConfirmar(false)}
                onConfirm={handleExcluirConta}
                onCancel={() => setModalConfirmar(false)}
            />

            <FeedbackModal
                visible={sucesso}
                title="Conta excluída com sucesso!"
                onClose={() => {
                    setSucesso(false);
                    router.replace('/login');
                }}
            />
        </SafeAreaView>
    );
}
