import React, { useMemo } from "react";
import { View, Text } from "react-native";
import { useSegments } from "expo-router";
import { styles } from "./HeaderStyle";
import UserButton from "@/components/UserButton/UserButton";

const TITLES: Record<string, string> = {
    home: "FinanceApp",
    bancos: "Bancos",
    categorias: "Categorias",
    relatorios: "Relatórios",
    transacoes: "Transações",
};

function capitalize(text: string) {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1);
}

export default function Header() {
    const segments = useSegments();

    const current = segments[segments.length - 1] ?? "home";

    const title = useMemo(() => {
        if (current === "home"){
            return "FinanceApp";
        }

        if (TITLES[current]){
            return TITLES[current];
        }

        return capitalize(current);
    }, [current]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <UserButton nome="BC" />
        </View>
    );
}
