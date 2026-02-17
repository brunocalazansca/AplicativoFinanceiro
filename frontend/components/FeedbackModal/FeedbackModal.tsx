import { Modal, Text, Pressable, ViewStyle } from "react-native";
import { styles } from "./FeedbackModalStyles";

type FeedbackModalProps = {
    visible: boolean;
    title: string;
    description?: string;
    onClose?: () => void;
    containerStyle?: ViewStyle;
};

export default function FeedbackModal({
    visible,
    title,
    description,
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
                        containerStyle,
                    ]}
                >
                    <Text style={[styles.title, !hasDescription && styles.titleNoDescription]}>
                        {title}
                    </Text>
                    {hasDescription && (
                        <Text style={styles.description}>
                            {description}
                        </Text>
                    )}
                </Pressable>
            </Pressable>
        </Modal>
    );
}


