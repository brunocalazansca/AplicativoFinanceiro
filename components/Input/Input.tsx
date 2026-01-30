import React from 'react';
import {View, TextInput, StyleProp, ViewStyle} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from './InputStyle'
import { InputType, inputMask } from "@/_utils/typeInput";

interface InputProps {
    icon?: React.ComponentProps<typeof Feather>['name'];
    placeholder: string;
    value?: string;
    onChangeText?: (text: string) => void;
    secureTextEntry?: boolean;
    type?: InputType;
    style?: StyleProp<ViewStyle>
}

export default function Input({
    icon,
    placeholder,
    value,
    onChangeText,
    secureTextEntry = false,
    type = 'none',
    style
}: InputProps) {
    const handleChangeText = (text: string) => {
        const masked = inputMask(text, type);
        onChangeText?.(masked);
    };

    return (
        <View style={[styles.container, style]}>
            <Feather
                name={icon}
                size={18}
                color="#9CA3AF"
                style={styles.icon}
            />

            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor="#9CA3AF"
                value={value}
                onChangeText={handleChangeText}
                secureTextEntry={secureTextEntry}
                inputMode={type}
                autoCapitalize={type === 'email' ? 'none' : 'sentences'}
            />
        </View>
    );
}
