import React from "react";
import { View, Text, Pressable, StyleProp, ViewStyle } from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from './BankCardStyle';
import { formatBRL } from "@/_utils/formatValue";

type FeatherName = React.ComponentProps<typeof Feather>["name"];

type Props = {
    name: string;
    amount: number;
    transactionsCount: number;
    color: string;
    iconName?: FeatherName;
    onPress?: () => void;
    onDelete?: () => void;
    style?: StyleProp<ViewStyle>;
};

function withAlpha(hex: string, alpha: number) {
    const clean = hex.replace("#", "");
    const full = clean.length === 3
        ? clean.split("").map((c) => c + c).join("")
        : clean;

    if (full.length !== 6) return `rgba(0,0,0,${alpha})`;

    const r = parseInt(full.slice(0, 2), 16);
    const g = parseInt(full.slice(2, 4), 16);
    const b = parseInt(full.slice(4, 6), 16);

    return `rgba(${r},${g},${b},${alpha})`;
}

export default function BankCard({
    name,
    amount,
    transactionsCount,
    color,
    iconName = "credit-card",
    onPress,
    onDelete,
    style,
}: Props) {
    const transText =
        transactionsCount === 1 ? "1 transação" : `${transactionsCount} transações`;

    return (
        <Pressable
            style={({ pressed }) => [
                styles.card,
                style,
                pressed && styles.pressed,
            ]}
            onPress={onPress}
        >
            <View style={[styles.leftBar, { backgroundColor: color }]} />

            <View style={styles.contentRow}>
                <View style={[styles.iconBox, { backgroundColor: withAlpha(color, 0.12) }]}>
                    <Feather name={iconName} size={20} color={color} />
                </View>

                <View style={styles.textArea}>
                    <Text style={styles.title} numberOfLines={1}>
                        {name}
                    </Text>

                    <Text style={styles.amount}>{formatBRL(amount)}</Text>

                    <Text style={styles.subtitle}>{transText}</Text>
                </View>

                <Pressable
                    onPress={onDelete}
                    hitSlop={12}
                    style={styles.trashButton}
                >
                    <Feather
                        name="trash-2"
                        size={18}
                        color="#6B7280"
                    />
                </Pressable>
            </View>
        </Pressable>
    );
}


