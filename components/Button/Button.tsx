import React from 'react';
import {TouchableOpacity, Text, ActivityIndicator, StyleProp, ViewStyle} from 'react-native';
import { styles } from './ButtonStyle';

interface ButtonProps {
    title: string;
    onPress: () => void;
    loading?: boolean;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
}

export default function Button({
    title,
    onPress,
    loading = false,
    disabled = false,
    style
}: ButtonProps) {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                (disabled || loading) && styles.disabled,
                style
            ]}
            onPress={onPress}
            activeOpacity={0.85}
            disabled={disabled || loading}
        >
            {loading ? (
                <ActivityIndicator color="#FFFFFF" />
            ) : (
                <Text style={styles.text}>{title}</Text>
            )}
        </TouchableOpacity>
    );
}
