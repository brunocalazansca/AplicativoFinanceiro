import { View, Text, ViewStyle, StyleProp } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { styles } from './Card.style';
import { ComponentProps } from 'react';

type FontAwesomeIconName = ComponentProps<typeof FontAwesome>['name'];

interface CardProps {
    title: string;
    valor?: number;
    valorColor: string;
    icon: FontAwesomeIconName;
    iconColor?: string;
    iconBackgroundColor?: string;
    color?: string;
    borderColor?: string;
    style?: StyleProp<ViewStyle>;
}

export default function Card({
    title,
    valor,
    valorColor,
    icon,
    iconColor,
    iconBackgroundColor,
    color,
    borderColor,
    style,
}: CardProps) {
    const formattedValue =
        valor !== undefined ? valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }) : '';

    return (
        <View
            style={[
                styles.container,
                color && { backgroundColor: color },
                borderColor && { borderColor },
                style,
            ]}
        >
            <View style={styles.headerRow}>
                <View style={[
                    styles.iconWrapper,
                    iconBackgroundColor && { backgroundColor: iconBackgroundColor
                }]}>
                    <FontAwesome
                        name={icon}
                        size={18}
                        color={iconColor || '#0F9153'}
                    />
                </View>

                <Text style={styles.title}>{title}</Text>
            </View>

            <Text style={[
                styles.value,
                valorColor && { color: valorColor }
            ]}>{formattedValue}</Text>
        </View>
    );
}
