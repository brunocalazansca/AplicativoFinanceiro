import {StyleProp, View, ViewStyle} from "react-native";
import { styles } from "./CardLoginStyle";
import React from "react";

interface CardLoginProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>
}

export default function CardLogin({ children, style }: CardLoginProps) {
    return <View style={[styles.container, style]}>{children}</View>;
}
