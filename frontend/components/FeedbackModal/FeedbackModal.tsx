import { Modal, Text, Pressable, ViewStyle } from "react-native";
import { styles } from "./FeedbackModalStyles";

type FeedbackModalProps = {
    visible: boolean;
    title: string;
    colorTitle?: string;
    description?: string;
    backgroundColor?: string;
    onClose?: () => void;
    containerStyle?: ViewStyle;
};

export default function FeedbackModal({
    visible,
    title,
    colorTitle = '#FFFFFF',
    description,
    backgroundColor = "#EF4444",
    onClose,
    containerStyle,
}: FeedbackModalProps) {
    const hasDescription = !!description?.trim();

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
            statusBarTranslucent
        >
            <Pressable style={styles.overlay} onPress={onClose}>
                <Pressable
                    onPress={() => {}}
                    style={[
                        styles.card,
                        { backgroundColor },
                        !hasDescription && styles.cardCenterVertically,
                        containerStyle,
                    ]}
                >
                    <Text style={[styles.title, { color: colorTitle }]}>{title}</Text>

                    {hasDescription && (
                        <Text style={styles.description}>{description}</Text>
                    )}
                </Pressable>
            </Pressable>
        </Modal>
    );
}


