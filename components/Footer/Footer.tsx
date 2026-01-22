// components/Footer/Footer.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "./FooterStyle";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";

export default function Footer({ state, navigation }: BottomTabBarProps) {
    const currentRouteName = state.routeNames[state.index];

    const isActive = (name: string) => currentRouteName === name;

    const handleNavigate = (name: string) => {
        if (currentRouteName === name) return;
        navigation.navigate(name as never);
    };

    return (
        <View style={styles.container}>
            <View style={styles.bar}>
                <View style={styles.navRow}>
                    <TouchableOpacity
                        style={styles.navItem}
                        onPress={() => handleNavigate("home")}
                    >
                        <Feather
                            name="home"
                            size={18}
                            color={isActive("home") ? "#2563EB" : "#6B7280"}
                        />
                        <Text
                            style={[
                                styles.navLabel,
                                isActive("home") && styles.navLabelActive,
                            ]}
                        >
                            Início
                        </Text>
                    </TouchableOpacity>

                    {/* Bancos */}
                    <TouchableOpacity
                        style={styles.navItem}
                        onPress={() => handleNavigate("bancos")}
                    >
                        <MaterialCommunityIcons
                            name="office-building"
                            size={18}
                            color={isActive("bancos") ? "#2563EB" : "#6B7280"}
                        />
                        <Text
                            style={[
                                styles.navLabel,
                                isActive("bancos") && styles.navLabelActive,
                            ]}
                        >
                            Bancos
                        </Text>
                    </TouchableOpacity>

                    {/* Categorias */}
                    <TouchableOpacity
                        style={styles.navItem}
                        onPress={() => handleNavigate("categorias")}
                    >
                        <Feather
                            name="tag"
                            size={18}
                            color={isActive("categorias") ? "#2563EB" : "#6B7280"}
                        />
                        <Text
                            style={[
                                styles.navLabel,
                                isActive("categorias") && styles.navLabelActive,
                            ]}
                        >
                            Categorias
                        </Text>
                    </TouchableOpacity>

                    {/* Relatórios */}
                    <TouchableOpacity
                        style={styles.navItem}
                        onPress={() => handleNavigate("relatorios")}
                    >
                        <Feather
                            name="file-text"
                            size={18}
                            color={isActive("relatorios") ? "#2563EB" : "#6B7280"}
                        />
                        <Text
                            style={[
                                styles.navLabel,
                                isActive("relatorios") && styles.navLabelActive,
                            ]}
                        >
                            Relatórios
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* FAB */}
                <TouchableOpacity
                    style={styles.fab}
                    onPress={() => handleNavigate("transacoes")}
                    activeOpacity={0.9}
                >
                    <Feather name="plus" size={24} color="#FFFFFF" />
                </TouchableOpacity>
            </View>
        </View>
    );
}
