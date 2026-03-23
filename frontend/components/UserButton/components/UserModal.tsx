import React, { useEffect } from 'react';
import {View, Text, TouchableOpacity, Pressable, Modal} from 'react-native';
import { styles } from './UserModalStyle';
import { Feather } from "@expo/vector-icons";
import { logout } from "@/services/userService";
import { getSession } from "@/storage/authStorage";
import { router, useFocusEffect } from "expo-router";

interface UserModalProps {
    name?: string;
    visible: boolean;
    loggout?: () => void;
    close?: () => void;
}

export default function UserModal({
    name,
    visible,
    loggout,
    close
}: UserModalProps) {
    const [storedName, setStoredName] = React.useState<string>("");

    useEffect(() => {
        if (!visible) return;

        (async () => {
            const session = await getSession();
            setStoredName(session?.user?.nome ?? "");
        })();
    }, [visible]);

    const nameToShow = name ?? storedName;

    if (!visible) return null;

    async function handleLoggout() {
        await logout();
        close?.();
        loggout?.();
    }

    const navigateToSettings = () => {
        router.push({
            pathname: "/(tabs)/configuracoes",
        })
    };

    return (
        <Modal visible={visible} transparent animationType="none" onRequestClose={close}>
            <Pressable
                style={styles.overlay}
                onPress={close}
            />
            <View style={styles.dropdown}>
                <View style={styles.userRow}>
                    <Feather
                        name='user'
                        size={25}
                        color='black'
                    />
                    <Text style={styles.usernameText}>{nameToShow}</Text>
                </View>

                <TouchableOpacity
                    onPress={navigateToSettings}
                    style={styles.row}
                >
                    <Feather
                        name='settings'
                        size={23}
                        color='#1D47C6'
                    />
                    <Text style={styles.config}>Configurações</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleLoggout}
                    style={styles.row}
                >
                    <Feather
                        name='log-out'
                        size={23}
                        color='red'
                    />
                    <Text style={styles.logout}>Sair</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}
