import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.55)",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },
    modal: {
        width: "100%",
        height: '20%',
        maxWidth: 450,
        backgroundColor: "#fff",
        borderRadius: 16,
        paddingTop: 18,
        paddingHorizontal: 40,
        paddingBottom: 25,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 10 },
        elevation: 10,
    },
    closeButton: {
        position: "absolute",
        top: 10,
        right: 10,
        width: 36,
        height: 36,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    closeIcon: {
        fontSize: 24,
        lineHeight: 24,
    },
    message: {
        marginTop: 25,
        fontSize: 16,
        color: "#1F2937",
        margin: 'auto'
    },
    actions: {
        marginTop: 18,
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
    },
    confirmBtn: {
        width: '45%',
    },
    cancelBtn: {
        width: '45%',
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: '#2F6EF2',
    },
});
