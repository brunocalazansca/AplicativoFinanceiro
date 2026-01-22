import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    button: {
        width: '80%',
    },
    textUser: {
        fontSize: 16,
        color: '#000000',
        alignSelf: 'flex-start',
        marginLeft: '2%'
    },
    textEmail: {
        fontSize: 16,
        color: '#000000',
        alignSelf: 'flex-start',
        marginLeft: '2%'
    },
    textSenha: {
        fontSize: 16,
        color: '#000000',
        alignSelf: 'flex-start',
        marginLeft: '2%'
    },
    textBemVindo: {
        fontSize: 28,
        color: '#000000',
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginLeft: '5%'
    },
    textNome: {
        fontSize: 28,
        color: '#000000',
        fontWeight: 'bold',
        marginLeft: '2%'
    },
    textContinuar: {
        fontSize: 16,
        color: '#000000',
        alignSelf: 'flex-start',
        marginBottom: 5,
        marginLeft: '5%'
    },
    textDescricao: {
        fontSize: 16,
        color: '#000000',
        marginBottom: 12,
    },
    switch: {
        width: '100%',
        padding: 10
    },
    login: {
        height: '45%'
    },
    register: {
        height: '55%'
    }
});
