import React from "react";
import { Modal, View, Text, TouchableOpacity, Pressable } from "react-native";
import { styles } from "./ConfirmModalStyle";
import Button from "@/components/Button/Button";
import {Feather} from "@expo/vector-icons";

type ConfirmModalProps = {
    visible: boolean;
    message: string;
    onClose: () => void;
    onConfirm: () => void;
    onCancel: () => void;
};

export default function ConfirmModal({
    visible,
    message,
    onClose,
    onConfirm,
    onCancel,
}: ConfirmModalProps) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            statusBarTranslucent
            onRequestClose={onClose}
        >
            <Pressable style={styles.overlay} onPress={onClose}>
                <Pressable style={styles.modal} onPress={() => {}}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={onClose}
                        accessibilityRole="button"
                        accessibilityLabel="Fechar"
                    >
                        <Feather
                            name="x-circle"
                            size={24}
                            color="#2F6EF2"
                            style={styles.closeIcon}
                        />
                    </TouchableOpacity>

                    <Text style={styles.message}>{message}</Text>

                    <View style={styles.actions}>
                        <Button
                            title="Confirmar"
                            onPress={onConfirm}
                            style={styles.confirmBtn}
                        />

                        <Button
                            title="Cancelar"
                            onPress={() => {
                                onCancel();
                                onClose();
                            }}
                            style={styles.cancelBtn}
                            textColor="#2F6EF2"
                        />
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    );
}
