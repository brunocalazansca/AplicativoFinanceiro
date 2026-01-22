import React from 'react';
import {View, Text, TouchableOpacity, Pressable} from 'react-native';
import { styles } from './UserModalStyle';
import { Feather } from "@expo/vector-icons";

interface UserModalProps {
    email: string;
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
    if (!visible) return null;

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
                    <Text style={styles.usernameText}>{email}</Text>
                </View>

                <TouchableOpacity
                    onPress={loggout}
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
