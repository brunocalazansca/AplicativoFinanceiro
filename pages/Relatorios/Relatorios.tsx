import { styles } from './RelatoriosStyle';
import { StatusBar, Text } from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

export default function Categorias() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="#FFFFFF"
                translucent={false}
            />
            <Text>Tela de Relatórios</Text>
        </SafeAreaView>
    )
}