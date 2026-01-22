import {View, Text} from "react-native";
import { styles } from './LoginStyle'
import { router, type Href } from "expo-router";
import Input from '../../components/Input/Input'
import Button from "../../components/Button/Button";
import CardLogin from "@/components/CardLogin/CardLogin";
import Switch from "@/components/Switch/Switch";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import {AuthMode} from "@/_utils/typeAuthMode";

export default function LoginForm () {
    const [mode, setMode] = useState<AuthMode>("login");
    const styleCard = mode === "login" ? styles.login : styles.register

    return (
        <View style={styles.container}>
            <Feather name="briefcase" size={80} color="#2A6DF4" />
            <Text style={styles.textNome}>FinnanceApp</Text>
            <Text style={styles.textDescricao}>Gerencie suas finanças de forma simples</Text>

            <CardLogin
                style={styleCard}
            >
                <View style={styles.content}>
                    <Text style={styles.textBemVindo}>Bem-vindo</Text>
                    <Text style={styles.textContinuar}>Entre ou crie sua conta para continuar</Text>

                    <View style={styles.switch}>
                        <Switch value={mode} onChange={setMode} />
                    </View>

                    {mode === "cadastro" && (
                        <>
                            <Text style={styles.textUser}>Nome completo</Text>
                            <Input
                                icon="user"
                                placeholder="Seu nome completo"
                                keyboardType="default"
                            />
                        </>
                    )}

                    <Text style={styles.textEmail}>Seu email</Text>
                    <Input
                        icon="mail"
                        placeholder="seu@email.com"
                        keyboardType="email-address"
                    />

                    <Text style={styles.textSenha}>Sua senha</Text>
                    <Input
                        icon="lock"
                        placeholder="••••••••"
                        secureTextEntry
                    />

                    {mode === "cadastro" ? (
                        <Button
                            title="Cadastrar"
                            onPress={() =>
                                router.replace('/home' as Href)
                            }
                            style={styles.button}
                        />
                    ) : (
                        <Button
                            title="Entrar"
                            onPress={() =>
                                router.replace('/home' as Href)
                            }
                            style={styles.button}
                        />
                    )}


                </View>
            </CardLogin>
        </View>
    )
}