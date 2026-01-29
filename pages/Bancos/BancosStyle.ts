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
    },
    buttonContainer: {
        position: "absolute",
        top: 16,
        left: 0,
        right: 0,
        zIndex: 10,
        alignItems: "flex-end",
        paddingHorizontal: 16,
    },
});
