import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./SwitchStyle";
import { SwitchMode } from "@/_utils/typeAuthMode";

interface SwitchProps {
    textEsquerda: string;
    textDireita: string;
    value: SwitchMode;
    onChange: (value: SwitchMode) => void;
}

export default function Switch({
    textEsquerda,
    textDireita,
    value,
    onChange
}: SwitchProps) {
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
                    {textEsquerda}
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
                    {textDireita}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

