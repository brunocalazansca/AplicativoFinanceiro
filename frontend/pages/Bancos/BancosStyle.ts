import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    buttonContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        elevation: 4,
        backgroundColor: "#fff",
        paddingTop: 16,
        paddingBottom: 12,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    countText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#6B7280",
        marginTop: 0,
        marginLeft: 8
    },
    cardsContainer: {
        paddingTop: 70,
        alignItems: "center",
        paddingBottom: 120,
    },
    button: {
        width: "40%",
        marginHorizontal: "3%",
        margin: 12,
    },
    card: {
        width: "90%",
    },
});
