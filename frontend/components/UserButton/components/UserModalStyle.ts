import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    dropdown: {
        position: 'absolute',
        right: 0,
        padding: 16,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        elevation: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        marginRight: '15%',
        marginTop: '24%',
        zIndex: 2,
        maxWidth: "85%"
    },
    usernameText: {
        fontSize: 16,
        fontWeight: '500',
        flexShrink: 1,
        flexWrap: "wrap"
    },
    logoutButton: {
        paddingVertical: 10,
    },
    logoutText: {
        color: 'red',
        fontWeight: '500',
    },
    logout: {
        textAlign: 'left',
        color: '#EF4343',
        fontWeight: '500',
        fontSize: 16,
    },
    config: {
        textAlign: 'left',
        fontWeight: '500',
        fontSize: 16,
        color: '#1D47C6',
    },
    userRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 5
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginTop: 5,
        marginBottom: 5
    },
    overlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'transparent',
        zIndex: 1,
    },
});
