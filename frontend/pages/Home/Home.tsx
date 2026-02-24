import React, { useCallback } from 'react';
import { StatusBar, View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { styles } from './HomeStyle';
import Card from '../../components/Card/Card';
import CardTransaction from "@/components/CardTransaction/CardTransaction";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from "expo-router";
import { useHandleTransacoes } from "@/handle/transacaoHandle";
import { useHandleBancos } from "@/handle/bancoHandle";
import { useHandleResumo } from "@/handle/resumoHandle";

export default function Home() {

    const {
        transacoes,
        initTransacao,
        loadingList
    } = useHandleTransacoes();

    const {
        bancos,
        initBanco
    } = useHandleBancos();

    const {
        resumo,
        initResumo
    } = useHandleResumo();

    useFocusEffect(
        useCallback(() => {
            initTransacao();
            initBanco();
            initResumo();
        }, [initTransacao, initBanco, initResumo])
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="#FFFFFF"
                translucent={false}
            />

            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <Card
                    title="Saldo Total"
                    icon="credit-card"
                    valor={resumo?.saldoTotal ?? 0}
                    valorColor="#000000"
                    color="#E6EEFF"
                    borderColor="#CADBFF"
                    iconBackgroundColor="#CBD9FF"
                    iconColor="#3654B3"
                    style={styles.balanceCard}
                />

                <View style={styles.row}>
                    <Card
                        title="Entradas"
                        icon="arrow-up"
                        valor={resumo?.entradas ?? 0}
                        valorColor="#16A249"
                        color="#E8F6ED"
                        borderColor="#CDEFD6"
                        iconBackgroundColor="#B6DEC7"
                        iconColor="#0F9153"
                        style={[styles.smallCard, styles.smallCardLeft]}
                    />

                    <Card
                        title="Despesas"
                        icon="arrow-down"
                        valor={resumo?.despesas ?? 0}
                        valorColor="#EF4343"
                        color="#FDEEEF"
                        borderColor="#F5C2C4"
                        iconBackgroundColor="#F7C9CB"
                        iconColor="#E05252"
                        style={[styles.smallCard, styles.smallCardRight]}
                    />
                </View>

                <View>
                    <Text style={styles.title}>Transações Recentes</Text>
                </View>

                {loadingList ? (
                    <View style={{ marginTop: 40, alignItems: 'center' }}>
                        <ActivityIndicator size="large" color="#3654B3" />
                    </View>
                ) : (
                    <View style={styles.cardTransactionList}>
                        {transacoes.length === 0 ? (
                            <Text style={{ color: "#6B7280", textAlign: 'center', marginTop: 20 }}>
                                Nenhuma transação recente.
                            </Text>
                        ) : (
                            transacoes.map((t) => {
                                const bancoDaTransacao = bancos.find(b => String(b.id) === String(t.bancoId));

                                return (
                                    <CardTransaction
                                        key={String(t.id)}
                                        type={t.tipoMovimentacao === 'ENTRADA' ? 'Entrada' : 'Despesa'}
                                        descricao={t.descricao}
                                        banco={bancoDaTransacao?.nome}
                                        valor={t.valor}
                                        data={t.data}
                                    />
                                );
                            })
                        )}
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}