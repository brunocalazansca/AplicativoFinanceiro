import { StyleSheet } from "react-native";
import {shadow} from "@/styles/shadow";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F6F7FB",
    },
    topRow: {
        paddingHorizontal: 16,
        paddingBottom: 20,
        paddingTop: 15,
        marginTop: '3%',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    monthText: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111827",
    },
    dropdownBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 14,
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    dropdownText: {
        fontSize: 13,
        fontWeight: "600",
        color: "#111827",
    },
    dropdownMenu: {
        position: "absolute",
        right: 0,
        top: 44,
        width: 170,
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        overflow: "hidden",
        elevation: 50,
        zIndex: 50,
        ...shadow,
    },
    dropdownItem: {
        paddingVertical: 12,
        paddingHorizontal: 12,
    },
    dropdownItemText: {
        fontSize: 13,
        color: "#111827",
        fontWeight: "600",
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
        marginBottom: '20%'
    },
    cardSpacing: {
        marginBottom: 14,
    },
    row: {
        flexDirection: "row",
        marginBottom: 14,
    },
    half: {
        flex: 1,
    },
    rowGapLeft: {
        marginRight: 10,
    },
    rowGapRight: {
        marginLeft: 10,
    },
    transacao: {
        alignItems: "center",
        paddingVertical: 12,
        marginBottom: 15,
    },
    transacaoText: {
        fontSize: 16,
        color: "#6B7280",
        fontWeight: "600",
    },
    scrollContent: {
        paddingBottom: 24,
    },
    scrollContainer: {
        flex: 1
    }
});