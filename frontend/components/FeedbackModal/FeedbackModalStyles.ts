import { StyleSheet } from "react-native";
import { shadow } from "@/styles/shadow";

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        paddingTop: 24,
        paddingHorizontal: 16,
        paddingBottom: "15%",
        backgroundColor: "transparent",
    },
    card: {
        width: "70%",
        borderRadius: 12,
        borderColor: "#000",
        borderWidth: 0.2,
        paddingVertical: 14,
        paddingHorizontal: 16,
        justifyContent: "center",
        alignItems: "center",
        minHeight: 80,
        ...shadow,
        backgroundColor: "#FFF"
    },
    title: {
        color: "#000",
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 6,
        includeFontPadding: false,
        textAlign: "center",
        width: "100%",
    },
    description: {
        color: "#000",
        fontSize: 14,
        fontWeight: "500",
        opacity: 0.95,
        includeFontPadding: false,
        textAlign: "center",
        width: "100%",
    },
    titleNoDescription: {
        marginBottom: 0,
    },
});
