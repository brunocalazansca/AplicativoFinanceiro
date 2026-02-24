import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        marginTop: 10
    },
    dropdownSelector: {
        backgroundColor: '#F9FAFB',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        paddingVertical: 14,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    selectorText: {
        fontSize: 16,
        color: '#1F2937',
    },
    placeholderText: {
        color: '#9CA3AF',
    },
    selectedDisplayButton: {
        borderRadius: 14,
        paddingVertical: 14,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    selectedDisplayText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        width: '80%',
        maxHeight: '60%',
        borderRadius: 14,
        padding: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    modalHeader: {
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    list: {
        marginVertical: 5,
    },
    emptyList: {
        padding: 20,
        alignItems: 'center'
    },
    emptyText: {
        color: '#6B7280',
        fontSize: 16
    },
    optionItem: {
        paddingVertical: 15,
        marginVertical: 6,
        borderRadius: 14,
        alignItems: 'center',
    },
    optionText: {
        fontSize: 16,
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    closeButton: {
        marginTop: 15,
        padding: 10,
        backgroundColor: '#eee',
        borderRadius: 14,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#555',
        fontWeight: '600',
    },
    icon: {
        marginLeft: 5,
        alignSelf: 'center',
        color: '#6B7280'
    }
});