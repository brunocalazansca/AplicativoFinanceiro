import React, { useEffect, useMemo, useState } from "react";
import {
    Modal,
    View,
    Text,
    Pressable,
    Platform,
    KeyboardAvoidingView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from './ModalBancosStyle'
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import { AddBankPayload } from "@/_utils/typeBankPayload";

interface AddBankModalProps {
    visible: boolean;
    onClose: () => void;
    onAdd: (payload: AddBankPayload) => void | Promise<void>;
    loading?: boolean;
    initialName?: string;
    initialColor?: string;
    colors?: string[];
}

export default function ModalBancos({
    visible,
    onClose,
    onAdd,
    loading = false,
    initialName = "",
    initialColor,
    colors,
}: AddBankModalProps) {
    const palette = useMemo(
        () =>
            colors ?? [
                "#2F6FED", // azul
                "#22C55E", // verde
                "#F59E0B", // laranja
                "#EF4444", // vermelho
                "#8B5CF6", // roxo
                "#EC4899", // rosa
                "#06B6D4", // ciano
                "#84CC16", // verde-lima
            ],
        [colors]
    );

    const [name, setName] = useState(initialName);
    const [selectedColor, setSelectedColor] = useState(
        initialColor ?? palette[0]
    );

    useEffect(() => {
        if (visible) {
            setName(initialName);
            setSelectedColor(initialColor ?? palette[0]);
        }
    }, [visible, initialName, initialColor, palette]);

    const canSubmit = name.trim().length > 0 && !loading;

    const handleAdd = async () => {
        if (!canSubmit) return;
        await onAdd({ name: name.trim(), color: selectedColor });
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <Pressable style={styles.backdrop} onPress={onClose}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                    style={styles.center}
                >
                    <Pressable style={styles.card} onPress={() => {}}>
                        <View style={styles.header}>
                            <Text style={styles.title}>Adicionar Banco</Text>

                            <Pressable
                                onPress={onClose}
                                hitSlop={10}
                                style={styles.closeButton}
                            >
                                <Feather name="x" size={20} color="#111827" />
                            </Pressable>
                        </View>

                        <Text style={styles.label}>Nome do Banco</Text>
                        <Input
                            icon="edit-3"
                            placeholder="Ex: Nubank, Itaú..."
                            value={name}
                            onChangeText={setName}
                            keyboardType="default"
                        />

                        <Text style={[styles.label, { marginTop: 14 }]}>Cor</Text>
                        <View style={styles.colorsRow}>
                            {palette.map((c) => {
                                const isSelected = c === selectedColor;

                                return (
                                    <Pressable
                                        key={c}
                                        onPress={() => setSelectedColor(c)}
                                        style={[
                                            styles.colorDot,
                                            { backgroundColor: c },
                                            isSelected && styles.colorDotSelected,
                                        ]}
                                    />
                                );
                            })}
                        </View>

                        <Button
                            title="Adicionar"
                            onPress={handleAdd}
                            loading={loading}
                            disabled={!canSubmit}
                            style={styles.addButton}
                        />
                    </Pressable>
                </KeyboardAvoidingView>
            </Pressable>
        </Modal>
    );
}
