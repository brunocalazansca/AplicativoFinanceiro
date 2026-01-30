import { View, Text } from "react-native";
import { styles } from "./LoginStyle";
import { router, type Href } from "expo-router";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import CardLogin from "@/components/CardLogin/CardLogin";
import Switch from "@/components/Switch/Switch";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { SwitchMode } from "@/_utils/typeAuthMode";

export default function LoginForm() {
    const [mode, setMode] = useState<SwitchMode>("login");
    const styleCard = mode === "login" ? styles.login : styles.register;

    const goToHome = () => {
        router.replace("/(tabs)/home" as Href);
    };

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
                            onChange={setMode}
                        />
                    </View>

                    {mode === "cadastro" && (
                        <>
                            <Text style={styles.textUser}>Nome completo</Text>
                            <Input
                                icon="user"
                                placeholder="Seu nome completo"
                                type="text"
                            />
                        </>
                    )}

                    <Text style={styles.textEmail}>Seu email</Text>
                    <Input
                        icon="mail"
                        placeholder="seu@email.com"
                        type="email"
                    />

                    <Text style={styles.textSenha}>Sua senha</Text>
                    <Input icon="lock" placeholder="••••••••" secureTextEntry />

                    {mode === "cadastro" ? (
                        <Button
                            title="Cadastrar"
                            onPress={goToHome}
                            style={styles.button}
                        />
                    ) : (
                        <Button
                            title="Entrar"
                            onPress={goToHome}
                            style={styles.button}
                        />
                    )}
                </View>
            </CardLogin>
        </View>
    );
}
