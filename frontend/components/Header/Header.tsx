import React, { useMemo } from "react";
import { View, Text } from "react-native";
import { useSegments, useGlobalSearchParams } from "expo-router";
import { styles } from "./HeaderStyle";
import UserButton from "@/components/UserButton/UserButton";

const TITLES: Record<string, string> = {
    home: "FinanceApp",
    bancos: "Bancos",
    categorias: "Categorias",
    relatorios: "Relatórios",
    transacoes: "Nova Transação",
};

function safeDecode(value: string) {
    try {
        return decodeURIComponent(value);
    } catch {
        return value;
    }
}

function capitalize(text: string) {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1);
}

export default function Header() {
    const segments = useSegments();
    const params = useGlobalSearchParams<{ nome?: string }>();

    const title = useMemo(() => {
        const clean = segments.filter((s) => s && !s.startsWith("("));
        const last = clean[clean.length - 1] ?? "home";
        const prev = clean[clean.length - 2];

        if (last === "home") return "FinanceApp";

        if (prev === "bancos") {
            const nomeParam = params.nome ? String(params.nome) : last;
            return safeDecode(nomeParam);
        }

        return TITLES[last] ?? capitalize(safeDecode(last));
    }, [segments, params.nome]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <UserButton />
        </View>
    );
}
