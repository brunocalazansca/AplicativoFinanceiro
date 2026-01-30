import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "#F3F4F6",
        borderRadius: 999,
        padding: 3,
    },
    tab: {
        flex: 1,
        height: 38,
        borderRadius: 999,
        alignItems: "center",
        justifyContent: "center",
    },
    tabActive: {
        backgroundColor: "#FFFFFF",
        // sombra leve opcional
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    text: {
        fontSize: 14,
        color: "#6B7280",
        fontWeight: "500",
    },
    textActive: {
        color: "#111827",
        fontWeight: "600",
    },
});