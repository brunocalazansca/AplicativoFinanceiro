import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './Footer.style';

export default function Footer() {
    const handleHome = () => {
        console.log('Ir para Início');
    };

    const handleBanks = () => {
        console.log('Ir para Bancos');
    };

    const handleCategories = () => {
        console.log('Ir para Categorias');
    };

    const handleReports = () => {
        console.log('Ir para Relatórios');
    };

    const handleAdd = () => {
        console.log('Adicionar nova transação');
    };

    return (
        <View style={styles.container}>
            <View style={styles.bar}>
                <View style={styles.navRow}>
                    <TouchableOpacity style={styles.navItem} onPress={handleHome}>
                        <Feather
                            name="home"
                            size={18}
                            color="#2563EB"
                        />
                        <Text style={[styles.navLabel, styles.navLabelActive]}>
                            Início
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.navItem} onPress={handleBanks}>
                        <MaterialCommunityIcons
                            name="office-building"
                            size={18}
                            color="#6B7280"
                        />
                        <Text style={styles.navLabel}>Bancos</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.navItem}
                        onPress={handleCategories}
                    >
                        <Feather name="tag" size={18} color="#6B7280" />
                        <Text style={styles.navLabel}>Categorias</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.navItem}
                        onPress={handleReports}
                    >
                        <Feather name="file-text" size={18} color="#6B7280" />
                        <Text style={styles.navLabel}>Relatórios</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.fab}
                    onPress={handleAdd}
                    activeOpacity={0.9}
                >
                    <Feather name="plus" size={24} color="#FFFFFF" />
                </TouchableOpacity>
            </View>
        </View>
    );
}
