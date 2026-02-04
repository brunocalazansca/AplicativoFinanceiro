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
    button: {
        width: "40%",
        marginHorizontal: '3%'
    },
    buttonContainer: {
        position: "absolute",
        top: 16,
        left: 0,
        right: 0,
        zIndex: 10,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: 'white',
    },
    countText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#6B7280",
        marginTop: '5%',
        marginHorizontal: '3%'
    },
    cardsContainer: {
        marginTop: '13%',
        alignItems: "center",
        paddingBottom: 120,
    },
    card: {
        width: '90%'
    }
});
