import React from "react";
import {View, Text, Pressable, StyleProp, ViewStyle,} from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from './CardCategoriaStyle'
import {withAlpha} from "@/_utils/alfaColors";

type FeatherName = React.ComponentProps<typeof Feather>["name"];

type CardCategoriaProps = {
    title: string;
    icon?: FeatherName;
    iconColor?: string;
    iconBgColor?: string;
    onPress?: () => void;
    onDelete?: () => void;
    style?: StyleProp<ViewStyle>;
};

export default function CardCategoria({
    title,
    icon = "tag",
    iconColor = "#EF4444",
    onPress,
    onDelete,
    style,
}: CardCategoriaProps) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [styles.container, style, pressed && styles.pressed]}
        >
            <View style={styles.left}>
                <View style={[styles.iconBadge, { backgroundColor: withAlpha(iconColor, 0.12) }]}>
                    <Feather name={icon} size={18} color={iconColor}/>
                </View>

                <Text style={styles.title} numberOfLines={1}>
                    {title}
                </Text>
            </View>

            {!!onDelete && (
                <Pressable onPress={onDelete} hitSlop={12} style={styles.deleteBtn}>
                    <Feather name="trash-2" size={18} color="#9CA3AF"/>
                </Pressable>
            )}
        </Pressable>
    );
}