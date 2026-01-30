import React from "react";
import { View, Text, StyleProp, ViewStyle } from "react-native";
import { Feather } from "@expo/vector-icons";
import { formatBRL } from "@/_utils/formatUtils";
import { styles } from './ReportCardStyle'

type FeatherName = React.ComponentProps<typeof Feather>["name"];

type Props = {
    title: string;
    iconName?: FeatherName;
    iconColor?: string;
    iconBgColor?: string;
    value?: number;
    valueColor?: string;
    backgroundColor?: string;
    borderColor?: string;
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
    emptyText?: string;
    emptyTextColor?: string;
    variant?: "default" | "compact";
    enableChildren?: boolean;
    showEmpty?: boolean;
};

export default function ReportCard({
    title,
    iconName,
    iconColor = "#2563EB",
    iconBgColor = "#E6EEFF",
    value,
    valueColor = "#16A34A",
    backgroundColor = "#FFFFFF",
    borderColor = "#E5E7EB",
    style,
    children,
    emptyText = "Nenhuma despesa no período",
    emptyTextColor = "#6B7280",
    variant = "default",
    enableChildren = true,
    showEmpty = true,
}: Props) {
    const hasChildren = React.Children.count(children) > 0;

    return (
        <View
            style={[
                styles.card,
                variant === "compact" && styles.cardCompact,
                { backgroundColor, borderColor },
                style,
            ]}
        >
            <View style={styles.headerRow}>
                {iconName ? (
                    <View style={[styles.iconBadge, { backgroundColor: iconBgColor }]}>
                        <Feather name={iconName} size={16} color={iconColor} />
                    </View>
                ) : null}

                <Text style={styles.title}>{title}</Text>
            </View>

            {typeof value === "number" ? (
                <Text style={[styles.value, { color: valueColor }]}>
                    {formatBRL(value)}
                </Text>
            ) : null}

            {hasChildren && enableChildren ? (
                <View style={styles.body}>{children}</View>
            ) : showEmpty && emptyText ? (
                <View style={styles.emptyBox}>
                    <Text style={[styles.emptyText, { color: emptyTextColor }]}>
                        {emptyText}
                    </Text>
                </View>
            ) : null}
        </View>
    );
}


