import React from 'react';
import {View, Text} from 'react-native';
import { styles } from './HeaderStyle';
import UserButton from "@/components/UserButton/UserButton";

export default function Header() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>FinanceApp</Text>
            <UserButton
                nome="BC"
            />
        </View>
    );
}
