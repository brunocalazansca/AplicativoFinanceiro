import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: -15
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
    },
    balanceCard: {
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        marginTop: 15,
    },
    smallCard: {
        flex: 1,
    },
    smallCardLeft: {
        marginRight: 8,
    },
    smallCardRight: {
        marginLeft: 8,
    },
    cardTransactionList: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        color: '#000000',
        fontWeight: 'bold',
        padding: 18
    },
    headerWrapper: {
        zIndex: 20,
        elevation: 20,
    },
});
