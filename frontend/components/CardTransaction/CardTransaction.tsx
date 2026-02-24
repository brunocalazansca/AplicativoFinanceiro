import React from 'react';
import {View, Text, TouchableOpacity,} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { TipoMovimentacao } from '@/_utils/typeTransaction';
import { styles } from './CardTransactionStyle';
import { formatDateLabel } from "@/_utils/formatUtils";

interface CardTransactionProps {
    type: TipoMovimentacao;
    descricao: string;
    banco?: string;
    valor: number;
    data: string;
    onDelete?: () => void;
}

export default function CardTransaction({
    type,
    descricao,
    banco,
    valor,
    data,
    onDelete,
}: CardTransactionProps) {
    const isEntrada = type === 'Entrada';

    const formattedValor = valor.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return (
        <View style={styles.card}>
            <View style={styles.leftArea}>
                <View style={[styles.iconContainer, isEntrada ? styles.iconEntrada : styles.iconDespesa]}>
                    <Feather
                        name={isEntrada ? 'arrow-up-right' : 'arrow-down-left'}
                        size={18}
                        color={isEntrada ? '#16A34A' : '#DC2626'}
                    />
                </View>

                <View style={styles.middleContent}>
                    <Text style={styles.descricao}>{descricao}</Text>
                    {banco && (
                        <Text style={styles.banco}>{banco}</Text>
                    )}
                </View>
            </View>

            <View style={styles.rightArea}>
                <View style={styles.valueDateContainer}>
                    <Text
                        style={[
                            styles.valor,
                            isEntrada ? styles.valorEntrada : styles.valorDespesa,
                        ]}
                    >
                        {isEntrada ? '+ ' : '- '}R$ {formattedValor}
                    </Text>

                    <Text style={styles.data}>{formatDateLabel(data)}</Text>
                </View>

                {onDelete && (
                    <TouchableOpacity
                        onPress={onDelete}
                        style={styles.trashButton}
                    >
                        <Feather
                            name="trash-2"
                            size={16}
                            color="#9CA3AF"
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}