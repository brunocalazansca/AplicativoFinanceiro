import { View, Text, ActivityIndicator } from "react-native";
import { styles } from "./LoginStyle";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import CardLogin from "@/components/CardLogin/CardLogin";
import Switch from "@/components/Switch/Switch";
import FeedbackModal from "@/components/FeedbackModal/FeedbackModal";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { SwitchMode } from "@/_utils/typeAuthMode";
import { useHandleLogin } from "@/handle/loginHandle";

export default function LoginForm() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mode, setMode] = useState<SwitchMode>("login");

    const styleCard = mode === "login" ? styles.login : styles.register;

    const { loading, feedback, setFeedback, handleSubmit } = useHandleLogin();

    const isDisabled =
        loading ||
        (mode === "login"
            ? !email.trim() || !senha.trim() || senha.length < 6
            : !nome.trim() || !email.trim() || !senha.trim() || senha.length < 6
        );

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
                        title={
                            loading ? "Aguarde..."
                            : mode === "cadastro"
                            ? "Cadastrar"
                            : "Entrar"
                        }
                        onPress={
                            () => handleSubmit({
                                mode,
                                nome,
                                email,
                                senha
                            })
                        }
                        style={styles.button}
                        disabled={isDisabled}
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
                        onClose={() => setFeedback(null)}
                    />
                </View>
            </CardLogin>
        </View>
    );
}
