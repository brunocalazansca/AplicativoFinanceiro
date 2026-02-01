import { View, Text, ActivityIndicator, Alert } from "react-native";
import { styles } from "./LoginStyle";
import { router, type Href } from "expo-router";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import CardLogin from "@/components/CardLogin/CardLogin";
import Switch from "@/components/Switch/Switch";
import FeedbackModal from "@/components/FeedbackModal/FeedbackModal";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { SwitchMode } from "@/_utils/typeAuthMode";
import { cadastrarUsuario , loginUsuario } from "@/services/userService";
import { FeedbackState } from '@/_utils/typeFeedback'


export default function LoginForm() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState<SwitchMode>("login");

    const styleCard = mode === "login" ? styles.login : styles.register;

    const [feedback, setFeedback] = useState<FeedbackState | null>(null);

    const goToHome = () => {
        router.replace("/(tabs)/home" as Href);
    };

    async function handleSubmit() {
        if (mode === "cadastro" && !nome.trim()) {
            Alert.alert("Atenção", "Informe seu nome completo.");
            return;
        }
        if (!email.trim()) {
            Alert.alert("Atenção", "Informe seu e-mail.");
            return;
        }
        if (!senha.trim() || senha.length < 6) {
            Alert.alert("Atenção", "Sua senha deve ter pelo menos 6 caracteres.");
            return;
        }

        try {
            setLoading(true);

            if (mode === "cadastro") {
                await cadastrarUsuario(nome.trim(), email.trim(), senha);

                setFeedback({
                    title: "Cadastro realizado!",
                    description: "Sua conta foi criada com sucesso.",
                    color: "#22C55E",
                });

                setTimeout(() => {
                    setFeedback(null);
                    goToHome();
                }, 2500);

                return;
            }

            await loginUsuario(email.trim(), senha);

            goToHome();
        } catch (err: any) {
            const msg =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                err?.message ||
                "Erro ao comunicar com o servidor.";

            setFeedback({
                title: msg,
                color: "#EF4444",
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <Feather name="briefcase" size={80} color="#2A6DF4" />
            <Text style={styles.textNome}>FinnanceApp</Text>
            <Text style={styles.textDescricao}>
                Gerencie suas finanças de forma simples
            </Text>

            <CardLogin style={styleCard}>
                <View style={styles.content}>
                    <Text style={styles.textBemVindo}>Bem-vindo</Text>
                    <Text style={styles.textContinuar}>
                        Entre ou crie sua conta para continuar
                    </Text>

                    <View style={styles.switch}>
                        <Switch
                            textEsquerda="Entrar"
                            textDireita="Cadastro"
                            value={mode}
                            leftValue="login"
                            rightValue="cadastro"
                            onChange={(val) => {
                                setMode(val);
                                setNome(""); setEmail(""); setSenha("");
                            }}
                        />
                    </View>

                    {mode === "cadastro" && (
                        <>
                            <Text style={styles.textUser}>Nome completo</Text>
                            <Input
                                icon="user"
                                placeholder="Seu nome completo"
                                type="text"
                                value={nome}
                                onChangeText={setNome}
                            />
                        </>
                    )}

                    <Text style={styles.textEmail}>Seu email</Text>
                    <Input
                        icon="mail"
                        placeholder="seu@email.com"
                        type="email"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <Text style={styles.textSenha}>Sua senha</Text>
                    <Input
                        icon="lock"
                        placeholder="••••••••"
                        secureTextEntry
                        value={senha}
                        onChangeText={setSenha}
                    />

                    <Button
                        title={loading ? "Aguarde..." : mode === "cadastro" ? "Cadastrar" : "Entrar"}
                        onPress={handleSubmit}
                        style={styles.button}
                        disabled={loading}
                    />

                    {loading && (
                        <View style={{ marginTop: 12 }}>
                            <ActivityIndicator />
                        </View>
                    )}

                    <FeedbackModal
                        visible={!!feedback}
                        title={feedback?.title ?? ""}
                        description={feedback?.description ?? ""}
                        backgroundColor={feedback?.color ?? "#EF4444"}
                        onClose={() => setFeedback(null)}
                    />
                </View>
            </CardLogin>
        </View>
    );
}
