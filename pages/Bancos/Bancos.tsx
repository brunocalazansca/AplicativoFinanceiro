import { styles } from './BancosStyle';
import {StatusBar, Text, View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/Button/Button";
import ModalBancos from "@/pages/Bancos/_components/ModalBancos";
import BankCard from "@/components/BankCard/BankCard";
import { useState } from "react";

export default function Bancos() {
    const [open, setOpen] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="#FFFFFF"
                translucent={false}
            />
            <View style={styles.buttonContainer}>
                <Text style={styles.countText}>2 bancos</Text>

                <Button
                    title="Banco"
                    onPress={() => setOpen(true)}
                    iconName="plus"
                    iconSize={24}
                    style={styles.button}
                />
            </View>

            <View style={styles.cardsContainer}>
                <BankCard
                    name="Banco do Brasil"
                    amount={1430}
                    transactionsCount={1}
                    color="#F59E0B"
                    onPress={() => console.log("Abrir banco")}
                    onDelete={() => console.log("Excluir banco")}
                    style={styles.card}
                />

                <BankCard
                    name="Nubank"
                    amount={900}
                    transactionsCount={2}
                    color="#8B5CF6"
                    onPress={() => console.log("Abrir banco")}
                    onDelete={() => console.log("Excluir banco")}
                    style={styles.card}
                />
            </View>

            <ModalBancos
                visible={open}
                onClose={() => setOpen(false)}
                onAdd={async ({ name, color }) => {
                    console.log("Novo banco:", name, color);
                    setOpen(false);
                }}
            />
        </SafeAreaView>
    )
}