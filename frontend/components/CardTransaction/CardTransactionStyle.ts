import { StyleSheet, Dimensions } from 'react-native';
import { shadow } from '@/styles/shadow';

const { width, height } = Dimensions.get('window');
const wp = (percent: number) => (width * percent) / 100;
const hp = (percent: number) => (height * percent) / 100;

export const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: wp(6),
        paddingHorizontal: wp(5),
        paddingVertical: hp(2),
        marginBottom: hp(1.4),
        borderWidth: 1,
        borderColor: '#E5E7EB',
        ...shadow,
    },
    leftArea: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconContainer: {
        width: wp(10),
        height: wp(10),
        borderRadius: wp(4),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: wp(4),
    },
    iconEntrada: {
        backgroundColor: '#E8F6ED',
    },
    iconDespesa: {
        backgroundColor: '#FDEEEF',
    },
    middleContent: {
        flexShrink: 1,
    },
    descricao: {
        fontSize: wp(4),
        fontWeight: '600',
        color: '#111827',
    },
    banco: {
        fontSize: wp(3.4),
        color: '#6B7280',
        marginTop: hp(0.4),
    },
    rightArea: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: wp(4),
    },
    valueDateContainer: {
        alignItems: 'flex-end',
    },
    valor: {
        fontSize: wp(4),
        fontWeight: '700',
    },
    valorEntrada: {
        color: '#16A249',
    },
    valorDespesa: {
        color: '#EF4343',
    },
    data: {
        fontSize: wp(3.3),
        color: '#6B7280',
        marginTop: hp(0.4),
    },
    trashButton: {
        marginLeft: wp(3),
    },
});
