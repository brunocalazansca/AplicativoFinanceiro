import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const wp = (percent: number) => (width * percent) / 100;
const hp = (percent: number) => (height * percent) / 100;

export const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    },
    bar: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: wp(6),
        borderTopRightRadius: wp(6),
        paddingTop: hp(2),
        paddingBottom: hp(3),
        paddingHorizontal: wp(7),

        shadowColor: '#000',
        shadowOffset: { width: 0, height: -hp(0.4) },
        shadowOpacity: 0.08,
        shadowRadius: wp(2.5),
        elevation: 12,
    },
    navRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    navLabel: {
        marginTop: hp(0.8),
        fontSize: wp(3.5),
        color: '#6B7280',
    },
    navLabelActive: {
        color: '#2563EB',
        fontWeight: '600',
    },
    fab: {
        position: 'absolute',
        alignSelf: 'center',
        top: -hp(4),

        width: wp(16),
        height: wp(16),
        borderRadius: wp(8),

        backgroundColor: '#2563EB',
        alignItems: 'center',
        justifyContent: 'center',

        shadowColor: '#000',
        shadowOffset: { width: 0, height: hp(0.6) },
        shadowOpacity: 0.3,
        shadowRadius: wp(3),
        elevation: 14,
    },
});
