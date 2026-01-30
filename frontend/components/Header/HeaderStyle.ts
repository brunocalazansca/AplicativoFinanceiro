import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const wp = (percent: number) => (width * percent) / 100;
const hp = (percent: number) => (height * percent) / 100;

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: hp(3.5),
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#D1D5DB',
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: wp(5),
        fontWeight: '700',
        color: '#111827',
    },
    userButton: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: '#1D47C6',
    }
});
