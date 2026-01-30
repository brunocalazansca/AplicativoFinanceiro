import { styles } from './CategoriasStyle';
import {StatusBar, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import CardCategoria from "@/pages/Categorias/_components/CardCategoria";
import Button from "@/components/Button/Button";
import {useState} from "react";
import AdditionModal from "@/components/AdditionModal/AdditionModal";

export default function Categorias() {
    const [open, setOpen] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="#FFFFFF"
                translucent={false}
            />

            <View style={styles.buttonContainer}>
                <Text style={styles.countText}>1 categoria</Text>

                <Button
                    title="Categoria"
                    onPress={() => setOpen(true)}
                    iconName="plus"
                    iconSize={24}
                    style={styles.button}
                />
            </View>

            <View style={styles.cardContainer}>
                <CardCategoria
                    title="Gasolina"
                    icon="tag"
                    onDelete={() => console.log("Categoria removida")}
                />
            </View>

            <AdditionModal
                title="Categoria"
                placeholder="Ex: Gasolina, Mercado..."
                descricao="da Categoria"
                visible={open}
                onClose={() => setOpen(false)}
                onAdd={async ({ name, color }) => {
                    console.log("Nova categoria:", name, color);
                    setOpen(false);
                }}
            />
        </SafeAreaView>
    )
}