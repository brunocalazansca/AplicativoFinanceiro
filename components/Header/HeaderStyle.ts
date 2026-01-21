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
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: wp(5),
        fontWeight: '700',
        color: '#111827',
    },
});
