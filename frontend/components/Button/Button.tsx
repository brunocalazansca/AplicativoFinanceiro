import React from "react";
import { TouchableOpacity, Text, ActivityIndicator, StyleProp, ViewStyle, View, } from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "./ButtonStyle";

interface ButtonProps {
    title: string;
    onPress: () => void;
    loading?: boolean;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
    iconName?: React.ComponentProps<typeof Feather>["name"];
    iconSize?: number;
    iconColor?: string;
}

export default function Button({
    title,
    onPress,
    loading = false,
    disabled = false,
    style,
    iconName,
    iconSize = 18,
    iconColor = "#FFFFFF",
}: ButtonProps) {
    return (
        <TouchableOpacity
            style={[styles.button, (disabled || loading) && styles.disabled, style]}
            onPress={onPress}
            activeOpacity={0.85}
            disabled={disabled || loading}
        >
            {loading ? (
                <ActivityIndicator color={iconColor} />
            ) : (
                <View style={styles.icon}>
                    {iconName ? (
                        <Feather
                            name={iconName}
                            size={iconSize}
                            color={iconColor}
                            style={{ marginRight: 6 }}
                        />
                    ) : null}

                    <Text style={styles.text}>{title}</Text>
                </View>
            )}
        </TouchableOpacity>
    );
}
