import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {StatusBar, View, Text, Pressable, Animated} from "react-native";
import { Feather } from "@expo/vector-icons";
import ReportCard from "./_components/ReportCard";
import { styles } from './RelatoriosStyle'
import { PeriodOption } from "@/_utils/typePeriodOptions";
import { RELATORIOS_DATA } from '@/data/relatorios'
import ScrollView = Animated.ScrollView;

export default function Relatorios() {
    const [period, setPeriod] = useState<PeriodOption>("Este mês");
    const [menuOpen, setMenuOpen] = useState(false);

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
                    <Text style={styles.monthText}>{RELATORIOS_DATA.monthLabel}</Text>

                    <View style={{ position: "relative" }}>
                        <Pressable
                            onPress={() => setMenuOpen((v) => !v)}
                            style={styles.dropdownBtn}
                        >
                            <Text style={styles.dropdownText}>{period}</Text>
                            <Feather name="chevron-down" size={16} color="#6B7280" />
                        </Pressable>

                        {menuOpen && (
                            <View style={styles.dropdownMenu}>
                                {(["Este mês", "Últimos 30 dias", "Este ano"] as PeriodOption[]).map(
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

                <View style={styles.content}>
                    <ReportCard
                        title="Balanço do período"
                        iconName="trending-up"
                        iconColor="#2563EB"
                        iconBgColor="#E6EEFF"
                        value={RELATORIOS_DATA.balance}
                        valueColor="#16A34A"
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
                            value={RELATORIOS_DATA.entradas}
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
                            value={RELATORIOS_DATA.despesas}
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
                    />

                    <ReportCard
                        title="Despesas por Banco"
                        iconName="credit-card"
                        iconColor="#111827"
                        iconBgColor="#F3F4F6"
                        emptyText="Nenhuma despesa no período"
                        style={styles.cardSpacing}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


