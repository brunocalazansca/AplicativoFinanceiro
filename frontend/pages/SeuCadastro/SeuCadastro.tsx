import { styles } from './SeuCadastroStyle';
import { StatusBar, View, Text, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import FeedbackModal from "@/components/FeedbackModal/FeedbackModal";
import { getSession } from "@/storage/authStorage";
import { atualizarUsuario } from "@/services/userService";
import { FeedbackState } from "@/_utils/typeFeedback";

export default function SeuCadastro() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState<FeedbackState | null>(null);

    useFocusEffect(
        useCallback(() => {
            getSession().then(session => {
                if (session?.user) {
                    setNome(session.user.nome);
                    setEmail(session.user.email);
                    setSenha('');
                }
            });
        }, [])
    );

    const handleSalvar = async () => {
        if (!nome.trim() || !email.trim()) return;
        if (senha && senha.length < 6) {
            setFeedback({ title: 'A senha deve ter pelo menos 6 caracteres.' });
            return;
        }
        setLoading(true);
        try {
            await atualizarUsuario(nome.trim(), email.trim(), senha || undefined);
            setSenha('');
            setFeedback({ title: 'Dados atualizados com sucesso!' });
        } catch (err: any) {
            const msg = err?.response?.data?.message ?? err?.message ?? String(err);
            setFeedback({ title: msg });
        } finally {
            setLoading(false);
        }
    };

    const isDisabled = !nome.trim() || !email.trim() || loading;

    return (
        <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.content}>
                        <Text style={styles.label}>Nome completo</Text>
                        <Input
                            icon="user"
                            placeholder="Seu nome completo"
                            value={nome}
                            onChangeText={setNome}
                        />

                        <Text style={styles.label}>Email</Text>
                        <Input
                            icon="mail"
                            placeholder="seu@email.com"
                            type="email"
                            value={email}
                            onChangeText={setEmail}
                        />

                        <Text style={styles.label}>Nova senha</Text>
                        <Input
                            icon="lock"
                            placeholder="Deixe em branco para não alterar"
                            secureTextEntry
                            value={senha}
                            onChangeText={setSenha}
                        />

                        <Button
                            title="Salvar alterações"
                            onPress={handleSalvar}
                            loading={loading}
                            disabled={isDisabled}
                            style={styles.saveBtn}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            <FeedbackModal
                visible={!!feedback}
                title={feedback?.title ?? ''}
                description={feedback?.description ?? ''}
                onClose={() => setFeedback(null)}
            />
        </SafeAreaView>
    );
}
