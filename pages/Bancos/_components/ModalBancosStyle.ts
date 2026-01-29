import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
    },
    center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 16,
    },
    card: {
        width: "100%",
        maxWidth: 520,
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 18,

        // sombra
        shadowColor: "#000",
        shadowOpacity: 0.18,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 8 },
        elevation: 8,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111827",
    },
    closeButton: {
        width: 34,
        height: 34,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    label: {
        fontSize: 13,
        fontWeight: "600",
        color: "#111827",
        marginBottom: 8,
    },
    colorsRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 14,
    },
    colorDot: {
        width: 28,
        height: 28,
        borderRadius: 999,
    },
    colorDotSelected: {
        borderWidth: 3,
        borderColor: "#E5E7EB",
    },
    addButton: {
        marginTop: 6,
        width: "100%",
        borderRadius: 12,
    },
});