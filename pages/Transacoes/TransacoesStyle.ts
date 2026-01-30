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
    switch: {
        width: '90%',
        alignSelf: 'center',
        marginTop: '6%',
        marginBottom: '6%',
    },
    size: {
        width: '90%',
        alignSelf: 'center',
    },
    content: {
        alignItems: 'center',
    },
    text: {
        marginRight: 'auto',
        marginLeft: '5%',
        marginTop: 6,
        fontSize: 14,
    },
    scrollContainer: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 24,
        paddingTop: 8,
        flexGrow: 1,
    },
    footer: {
        width: '90%',
        alignSelf: 'center',
        marginBottom: '25%'
    }
});
