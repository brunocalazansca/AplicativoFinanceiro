import React, {useEffect, useState} from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from './UserButtonStyle';
import UserModal from "@/components/UserButton/components/UserModal";
import {Href, router} from "expo-router";
import { getNomeUsuarioLogado } from "@/services/userService";

export default function UserButton() {
    const [visibleModal, setVisibleModal] = useState(false);
    const [nome, setNome] = useState("");

    useEffect(() => {
        (async () => {
            const n = await getNomeUsuarioLogado();
            setNome(n);
        })();
    }, []);

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
                visible={visibleModal}
                loggout={logout}
                close={() => setVisibleModal(false)}
            />
        </>
    );
}
