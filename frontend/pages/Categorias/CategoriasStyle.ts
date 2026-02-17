import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    headerWrapper: {
        zIndex: 20,
        elevation: 20,
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
        fontSize: 14,
        fontWeight: "bold",
        color: "#6B7280",
        marginTop: 12,
        marginLeft: 8
    },
    cardContainer: {
        alignItems: 'center',
        flex: 1,
        padding: 12,
        marginTop: '10%',
    },
    button: {
        width: "40%",
        marginHorizontal: '3%'
    },
});
