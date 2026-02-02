import React, { useEffect } from 'react';
import {View, Text, TouchableOpacity, Pressable} from 'react-native';
import { styles } from './UserModalStyle';
import { Feather } from "@expo/vector-icons";
import { logout } from "@/services/userService";
import { getSession } from "@/storage/authStorage";

interface UserModalProps {
    email?: string;
    visible: boolean;
    loggout?: () => void;
    close?: () => void;
}

export default function UserModal({
    email,
    visible,
    loggout,
    close
}: UserModalProps) {
    const [storedEmail, setStoredEmail] = React.useState<string>("");

    useEffect(() => {
        if (!visible) return;

        (async () => {
            const session = await getSession();
            setStoredEmail(session?.user?.email ?? "");
        })();
    }, [visible]);

    const emailToShow = email ?? storedEmail;

    if (!visible) return null;

    async function handleLoggout() {
        await logout();
        close?.();
        loggout?.();
    }

    return (
        <>
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
                    <Text style={styles.usernameText}>{emailToShow}</Text>
                </View>

                <TouchableOpacity
                    onPress={handleLoggout}
                    style={styles.logoutRow}
                >
                    <Feather
                        name='log-out'
                        size={23}
                        color='red'
                    />
                    <Text style={styles.logout}>Sair</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}
