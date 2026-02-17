import React from "react";
import { View, Text, Pressable, StyleProp, ViewStyle } from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from './BankCardStyle';
import { formatBRL } from "@/_utils/formatUtils";
import { withAlpha } from "@/_utils/alfaColors";

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


