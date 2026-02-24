import React, {useCallback, useState} from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { router, useLocalSearchParams, useFocusEffect } from "expo-router";

import CardTransaction from "@/components/CardTransaction/CardTransaction";
import { styles } from "@/app/(tabs)/bancos/[nome]Style";
import { Feather } from "@expo/vector-icons";

import { useHandleTransacoes } from "@/handle/transacaoHandle";
import ConfirmModal from "@/components/Modal/ConfirmModal";

export default function BancoDetalhe() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [openConfirm, setOpenConfirm] = useState(false);
    const [transacaoId, setTransacaoId] = useState<number | null>(null);

    const {
        transacoes,
        initTransacao,
        deleteTransacao,
        loadingList
    } = useHandleTransacoes();

    useFocusEffect(
        useCallback(() => {
            if (id) {
                initTransacao(Number(id));
            }
        }, [id, initTransacao])
    );

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

            {loadingList ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#2F6EF2" />
                </View>
            ) : (
                <FlatList
                    data={transacoes}
                    keyExtractor={(item) => String(item.id)}
                    contentContainerStyle={{ gap: 12, paddingBottom: 24 }}
                    renderItem={({ item }) => (
                        <CardTransaction
                            type={item.tipoMovimentacao === 'ENTRADA' ? 'Entrada' : 'Despesa'}
                            descricao={item.descricao}
                            valor={item.valor}
                            data={item.data}
                            onDelete={() => {
                                setTransacaoId(item.id);
                                setOpenConfirm(true);
                            }}
                        />
                    )}
                    ListEmptyComponent={
                        <Text style={{ color: "#6B7280", textAlign: 'center', marginTop: 20 }}>
                            Nenhuma transação cadastrada neste banco.
                        </Text>
                    }
                />
            )}

            <ConfirmModal
                visible={openConfirm}
                message="Tem certeza que deletar esta transação?"
                onClose={() => setOpenConfirm(false)}
                onConfirm={async () => {
                    if (transacaoId != null) await deleteTransacao(transacaoId);
                    setTransacaoId(null);
                    setOpenConfirm(false);
                }}
                onCancel={() => {
                    setTransacaoId(null);
                    setOpenConfirm(false);
                }}
            />
        </View>
    );
}