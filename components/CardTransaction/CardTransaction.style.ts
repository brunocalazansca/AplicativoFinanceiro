import { StyleSheet } from 'react-native';
import { shadow } from "@/styles/shadow";

export const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        ...shadow
    },
    leftArea: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconContainer: {
        width: 32,
        height: 32,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
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
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
    },
    banco: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 2,
    },
    rightArea: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 12,
    },
    valueDateContainer: {
        alignItems: 'flex-end',
    },
    valor: {
        fontSize: 14,
        fontWeight: '700',
    },
    valorEntrada: {
        color: '#16A249',
    },
    valorDespesa: {
        color: '#EF4343',
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    data: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 2,
    },
    trashButton: {
        marginLeft: 8,
    },
});
