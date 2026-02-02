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
        marginTop: 20,
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
        alignItems: 'center',
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
        paddingVertical: 12,
        marginLeft: '5%'
    },
    textDescricao: {
        fontSize: 16,
        color: '#000000',
        marginBottom: 13,
        alignItems: 'center'
    },
    switch: {
        width: '100%',
        padding: 8,
        marginBottom: 3
    },
    login: {
        height: '50%'
    },
    register: {
        height: '60%'
    }
});
