import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./SwitchStyle";
import { AuthMode } from "@/_utils/typeAuthMode";

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
                    value === "cadastro" && styles.tabActive,
                ]}
                onPress={() => onChange("cadastro")}
                activeOpacity={0.8}
            >
                <Text
                    style={[
                        styles.text,
                        value === "cadastro" && styles.textActive,
                    ]}
                >
                    Cadastrar
                </Text>
            </TouchableOpacity>
        </View>
    );
}

