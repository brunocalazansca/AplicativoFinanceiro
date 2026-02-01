import {StyleSheet} from "react-native";
import {shadow} from "@/styles/shadow";

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        paddingTop: 24,
        paddingHorizontal: 16,
        paddingBottom: '15%',
        backgroundColor: "transparent",
    },
    card: {
        width: "70%",
        height: 80,
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 16,
        ...shadow
    },
    title: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 6,
    },
    description: {
        color: "#FFF",
        fontSize: 14,
        fontWeight: "500",
        opacity: 0.95,
    },
    cardCenterVertically: {
        justifyContent: "center",
    },
    titleCenter: {
        textAlign: "center",
        marginBottom: 0,
    },
});