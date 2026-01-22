import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./SwitchStyle";

type AuthMode = "login" | "register";

interface SwitchProps {
    value: AuthMode;
    onChange: (value: AuthMode) => void;
}

export default function Switch({ value, onChange }: SwitchProps) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[
                    styles.tab,
                    value === "login" && styles.tabActive,
                ]}
                onPress={() => onChange("login")}
                activeOpacity={0.8}
            >
                <Text
                    style={[
                        styles.text,
                        value === "login" && styles.textActive,
                    ]}
                >
                    Entrar
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.tab,
                    value === "register" && styles.tabActive,
                ]}
                onPress={() => onChange("register")}
                activeOpacity={0.8}
            >
                <Text
                    style={[
                        styles.text,
                        value === "register" && styles.textActive,
                    ]}
                >
                    Cadastrar
                </Text>
            </TouchableOpacity>
        </View>
    );
}

