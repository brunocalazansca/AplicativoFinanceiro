import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './HeaderStyle';

export default function Header() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>FinanceApp</Text>
        </View>
    );
}
