import React, { useMemo } from "react";
import {View, Text, FlatList, TouchableOpacity} from "react-native";
import {router, useLocalSearchParams} from "expo-router";

import CardTransaction from "@/components/CardTransaction/CardTransaction"; // ajuste o caminho
import { BANKS } from "@/data/bancos";
import {styles} from "@/app/(tabs)/bancos/[nome]Style";
import {Feather} from "@expo/vector-icons";

export default function BancoDetalhe() {
    const { nome } = useLocalSearchParams<{ nome: string }>();

    const bank = useMemo(() => {
        const n = nome;
        return BANKS.find((b) => b.nome === n);
    }, [nome]);

    if (!bank) {
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 16 }}>Banco não encontrado.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.push('/bancos')}
                >
                    <Feather
                        name="arrow-left"
                        size={18}
                        style={styles.icon}
                    />
                    <Text style={styles.buttonVoltar}>Voltar</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={bank.transacoes}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ gap: 12, paddingBottom: 24 }}
                renderItem={({ item }) => (
                    <CardTransaction
                        type={item.type}
                        descricao={item.descricao}
                        // banco={item.banco}
                        valor={item.valor}
                        data={item.data}
                        onDelete={() => console.log("Remover transação", item.id)}
                    />
                )}
                ListEmptyComponent={
                    <Text style={{ color: "#6B7280" }}>Nenhuma transação nesse banco.</Text>
                }
            />
        </View>
    );
}
