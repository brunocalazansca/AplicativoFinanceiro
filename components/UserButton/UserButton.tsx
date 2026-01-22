import React, {useState} from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from './UserButtonStyle';
import UserModal from "@/components/UserButton/components/UserModal";
import {Href, router} from "expo-router";

interface UserButtonProps {
    nome: string;
}

export default function UserButton({
    nome,
}: UserButtonProps) {
    const [visibleModal, setVisibleModal] = useState(false);

    const openModal = () => {
        setVisibleModal(true);
    }

    const logout = () => {
        setVisibleModal(false);
        router.replace('/login' as Href);
    }

    return (
        <>
            <TouchableOpacity
                style={styles.userButton}
                onPress={openModal}
            >
                <Text style={styles.nome}>{nome}</Text>
            </TouchableOpacity>

            <UserModal
                email='bruno@gmail.com'
                visible={visibleModal}
                loggout={logout}
                close={() => setVisibleModal(false)}
            />
        </>
    );
}
