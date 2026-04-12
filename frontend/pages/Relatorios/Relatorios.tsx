import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar, View, Text, Pressable, Animated, ActivityIndicator } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import DateTimePickerInput from "@/components/DataTimePicker/DataTimePicker";
import ReportCard from "./_components/ReportCard";
import { styles } from './RelatoriosStyle'
import { formatBRL } from "@/_utils/formatUtils";
import ScrollView = Animated.ScrollView;

import { DROPDOWN_OPTIONS } from "@/_utils/relatorioConstants";
import { useHandleRelatorio } from "@/handle/relatorioHandle";

export default function Relatorios() {
    const {
        period,
        setPeriod,
        menuOpen,
        setMenuOpen,
        relatorio,
        loading,
        customStartDate,
        setCustomStartDate,
        customEndDate,
        setCustomEndDate,
        fetchRelatorio,
        balanco,
        totalEntradas,
        totalDespesas,
        periodoLabel,
        despesasPorCategoria,
        despesasPorBanco,
        balancoColor
    } = useHandleRelatorio();

    useFocusEffect(
        useCallback(() => {
            fetchRelatorio();
        }, [fetchRelatorio])
    );



    return (
        <SafeAreaView
            style={styles.container}
            edges={["left", "right", "bottom"]}
        >
            <StatusBar barStyle="dark-content" backgroundColor="#F6F7FB" />

            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.topRow}>
                    <Text style={styles.monthText}>{periodoLabel}</Text>

                    <View style={{ position: "relative", zIndex: 100 }}>
                        <Pressable
                            onPress={() => setMenuOpen((v) => !v)}
                            style={styles.dropdownBtn}
                        >
                            <Text style={styles.dropdownText}>{period}</Text>
                            <Feather name="chevron-down" size={16} color="#6B7280" />
                        </Pressable>

                        {menuOpen && (
                            <View style={styles.dropdownMenu}>
                                {DROPDOWN_OPTIONS.map(
                                    (opt) => (
                                        <Pressable
                                            key={opt}
                                            style={styles.dropdownItem}
                                            onPress={() => {
                                                setPeriod(opt);
                                                setMenuOpen(false);
                                            }}
                                        >
                                            <Text style={styles.dropdownItemText}>{opt}</Text>
                                        </Pressable>
                                    )
                                )}
                            </View>
                        )}
                    </View>
                </View>

                {period === "Personalizado" && (
                    <View style={styles.customDateContainer}>
                        <View style={styles.customDateInputs}>
                            <DateTimePickerInput 
                                value={customStartDate}
                                onChange={setCustomStartDate}
                                placeholder="Data início"
                                style={styles.datePicker}
                            />
                            <DateTimePickerInput 
                                value={customEndDate}
                                onChange={setCustomEndDate}
                                placeholder="Data fim"
                                minimumDate={customStartDate || undefined}
                                style={styles.datePicker}
                            />
                        </View>
                    </View>
                )}

                {loading ? (
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingTop: 60 }}>
                        <ActivityIndicator size="large" color="#2563EB" />
                    </View>
                ) : (
                    <View style={styles.content}>
                        <ReportCard
                            title="Balanço do período"
                            iconName="trending-up"
                            iconColor="#2563EB"
                            iconBgColor="#E6EEFF"
                            value={balanco}
                            valueColor={balancoColor}
                            style={styles.cardSpacing}
                            enableChildren={false}
                            showEmpty={false}
                        />

                        <View style={styles.row}>
                            <ReportCard
                                variant="compact"
                                title="Entradas"
                                iconName="arrow-up-right"
                                iconColor="#16A34A"
                                iconBgColor="#E8F6ED"
                                value={totalEntradas}
                                valueColor="#16A34A"
                                backgroundColor="#EEF7F3"
                                borderColor="#D1EBDD"
                                style={[styles.half, styles.rowGapLeft]}
                            />

                            <ReportCard
                                variant="compact"
                                title="Despesas"
                                iconName="arrow-down-left"
                                iconColor="#EF4444"
                                iconBgColor="#FDEEEF"
                                value={totalDespesas}
                                valueColor="#EF4444"
                                backgroundColor="#FBF1F1"
                                borderColor="#F2D6D7"
                                style={[styles.half, styles.rowGapRight]}
                            />
                        </View>

                        <ReportCard
                            title="Despesas por Categoria"
                            emptyText="Nenhuma despesa no período"
                            style={styles.cardSpacing}
                            enableChildren={despesasPorCategoria.length > 0}
                            showEmpty={despesasPorCategoria.length === 0}
                        >
                            {despesasPorCategoria.map((cat) => (
                                <View key={cat.categoriaId} style={styles.breakdownRow}>
                                    <View style={styles.breakdownLeft}>
                                        <View style={[styles.breakdownDot, { backgroundColor: cat.corHex || "#6B7280" }]} />
                                        <Text style={styles.breakdownLabel}>{cat.categoriaNome}</Text>
                                    </View>
                                    <Text style={styles.breakdownValue}>{formatBRL(cat.total)}</Text>
                                </View>
                            ))}
                        </ReportCard>

                        <ReportCard
                            title="Despesas por Banco"
                            iconName="credit-card"
                            iconColor="#111827"
                            iconBgColor="#F3F4F6"
                            emptyText="Nenhuma despesa no período"
                            style={styles.cardSpacing}
                            enableChildren={despesasPorBanco.length > 0}
                            showEmpty={despesasPorBanco.length === 0}
                        >
                            {despesasPorBanco.map((banco) => (
                                <View key={banco.bancoId} style={styles.breakdownRow}>
                                    <View style={styles.breakdownLeft}>
                                        <View style={[styles.breakdownDot, { backgroundColor: banco.corHex || "#6B7280" }]} />
                                        <Text style={styles.breakdownLabel}>{banco.bancoNome}</Text>
                                    </View>
                                    <Text style={styles.breakdownValue}>{formatBRL(banco.total)}</Text>
                                </View>
                            ))}
                        </ReportCard>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
