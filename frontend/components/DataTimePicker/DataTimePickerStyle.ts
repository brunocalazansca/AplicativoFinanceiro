import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginBottom: 12,
    },
    label: {
        fontSize: 14,
        color: "#374151",
        marginBottom: 4,
    },
    input: {
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        backgroundColor: "#F9FAFB",
        paddingHorizontal: 12,
        paddingVertical: 6,
        flexDirection: "row",
        alignItems: "center",
    },
    inputText: {
        fontSize: 16,
        color: "#111827",
        flex: 1,
        paddingVertical: 6,
    },
    placeholder: {
        color: "#9CA3AF",
    },
    iconButton: {
        marginLeft: 8,
        paddingHorizontal: 4,
        paddingVertical: 4,
    },
});