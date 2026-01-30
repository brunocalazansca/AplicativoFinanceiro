import React, { useState } from 'react';
import {View, Text, TouchableOpacity, Modal, FlatList, ListRenderItem, StyleProp, ViewStyle} from 'react-native';
import {Feather} from "@expo/vector-icons";
import {SelectOption} from "@/_utils/selectOptions";
import { styles } from './SelectStyle'

interface SelectProps {
    options: SelectOption[];
    onSelect: (item: SelectOption) => void;
    placeholder?: string;
    style?: StyleProp<ViewStyle>
}

export default function Select({
    options,
    onSelect,
    placeholder = 'Selecione uma opção...',
    style,
}: SelectProps) {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<SelectOption | null>(null);

    const handleSelect = (item: SelectOption) => {
        setSelectedItem(item);
        onSelect(item);
        setModalVisible(false);
    };

    const renderOption: ListRenderItem<SelectOption> = ({ item }) => (
        <TouchableOpacity
            style={styles.optionItem}
            onPress={() => handleSelect(item)}
        >
            <Text style={styles.optionText}>{item.nome}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.dropdownSelector, style]}
                onPress={() => setModalVisible(true)}
                activeOpacity={0.8}
            >
                <Text style={[
                    styles.selectorText,
                    !selectedItem && styles.placeholderText
                ]}>
                    {selectedItem ? selectedItem.nome : placeholder}
                </Text>
                <Feather
                    name="chevron-down"
                    size={14}
                    style={styles.icon}
                />
            </TouchableOpacity>

            {selectedItem && (
                <View style={[
                    styles.selectedDisplayButton,
                    { backgroundColor: selectedItem.cor }
                ]}>
                    <Text style={styles.selectedDisplayText}>
                        {selectedItem.nome}
                    </Text>
                </View>
            )}

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setModalVisible(false)}
                >
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Escolha uma opção</Text>
                        </View>

                        <FlatList
                            data={options}
                            keyExtractor={(item) => item.id}
                            renderItem={renderOption}
                            style={styles.list}
                            showsVerticalScrollIndicator={false}
                        />

                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
}

