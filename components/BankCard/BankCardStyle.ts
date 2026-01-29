import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        overflow: "hidden",
        paddingVertical: 18,
        paddingHorizontal: 16,
        marginBottom: 14,

        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
        elevation: 2,
    },
    pressed: {
        opacity: 0.92,
        transform: [{ scale: 0.995 }],
    },
    leftBar: {
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: 4,
    },
    contentRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 14,
    },
    iconBox: {
        width: 44,
        height: 44,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    textArea: {
        flex: 1,
        paddingTop: 2,
    },
    title: {
        fontSize: 16,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 6,
    },
    amount: {
        fontSize: 20,
        fontWeight: "800",
        color: "#16A34A", // verde do print
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 13,
        color: "#6B7280",
    },
    trashButton: {
        paddingTop: 2,
        paddingLeft: 8,
    },
});