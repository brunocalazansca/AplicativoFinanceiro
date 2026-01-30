import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    card: {
        width: "100%",
        borderRadius: 14,
        borderWidth: 1,
        padding: 16,

        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
        elevation: 3,
    },
    cardCompact: {
        padding: 14,
        minHeight: 90,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    iconBadge: {
        width: 34,
        height: 34,
        borderRadius: 999,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 14,
        fontWeight: "600",
        color: "#374151",
    },
    value: {
        marginTop: 10,
        fontSize: 26,
        fontWeight: "800",
    },
    body: {
        marginTop: 12,
    },
    emptyBox: {
        marginTop: 14,
        paddingVertical: 24,
        alignItems: "center",
        justifyContent: "center",
    },
    emptyText: {
        fontSize: 14,
        fontWeight: "500",
    },
});