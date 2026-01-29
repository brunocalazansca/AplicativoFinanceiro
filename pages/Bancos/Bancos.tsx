import { styles } from './BancosStyle';
import {StatusBar, Text, View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/Button/Button";
import ModalBancos from "@/pages/Bancos/_components/ModalBancos";
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
                <Button
                    title="Banco"
                    onPress={() => setOpen(true)}
                    iconName="plus"
                    iconSize={24}
                    style={
                        styles.button
                    }
                />

                <ModalBancos
                    visible={open}
                    onClose={() => setOpen(false)}
                    onAdd={async ({ name, color }) => {
                        console.log("Novo banco:", name, color);
                        setOpen(false);
                    }}
                />
            </View>
        </SafeAreaView>
    )
}