import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./SwitchStyle";
import { SwitchMode } from "@/_utils/typeAuthMode";

interface SwitchProps {
    textEsquerda: string;
    textDireita: string;
    value: SwitchMode;
    leftValue: SwitchMode;
    rightValue: SwitchMode;
    onChange: (value: SwitchMode) => void;
}

export default function Switch({
    textEsquerda,
    textDireita,
    value,
    leftValue,
    rightValue,
    onChange,
}: SwitchProps) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[
                    styles.tab,
                    value === leftValue && styles.tabActive,
                ]}
                onPress={() => onChange(leftValue)}
                activeOpacity={0.8}
            >
                <Text
                    style={[
                        styles.text,
                        value === leftValue && styles.textActive,
                    ]}
                >
                    {textEsquerda}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.tab,
                    value === rightValue && styles.tabActive,
                ]}
                onPress={() => onChange(rightValue)}
                activeOpacity={0.8}
            >
                <Text
                    style={[
                        styles.text,
                        value === rightValue && styles.textActive,
                    ]}
                >
                    {textDireita}
                </Text>
            </TouchableOpacity>
        </View>
    );
}
