import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    buttonContainer: {
        paddingTop: 16,
        paddingBottom: 12,
        paddingHorizontal: 16,
    },
    countText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#6B7280',
        marginLeft: '4.5%',
    },
    cardContainer: {
        alignItems: 'center',
        flex: 1,
        padding: 12,
    },
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    center: {
        width: '100%',
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#fff',
        width: '85%',
        borderRadius: 16,
        padding: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#F9FAFB',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        paddingVertical: 14,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#1F2937',
        marginBottom: 16,
    },
    saveButton: {
        marginTop: 4,
    },
});
