import { StatusBar, View, Text } from 'react-native';
import { styles } from './HomeStyle';
import Card from '../../components/Card/Card';
import CardTransaction from "@/components/CardTransaction/CardTransaction";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="#FFFFFF"
                translucent={false}
            />

            <View style={styles.content}>
                <Card
                    title="Saldo Total"
                    icon="credit-card"
                    valor={2330}
                    valorColor="#000000"
                    color="#E6EEFF"
                    borderColor="#CADBFF"
                    iconBackgroundColor="#CBD9FF"
                    iconColor="#3654B3"
                    style={styles.balanceCard}
                />

                <View>
                    <Text style={styles.title}>Transações Recentes</Text>
                </View>

                <View style={styles.row}>
                    <Card
                        title="Entradas"
                        icon="arrow-up"
                        valor={2430}
                        valorColor="#16A249"
                        color="#E8F6ED"
                        borderColor="#CDEFD6"
                        iconBackgroundColor="#B6DEC7"
                        iconColor="#0F9153"
                        style={[styles.smallCard, styles.smallCardLeft]}
                    />

                    <Card
                        title="Despesas"
                        icon="arrow-down"
                        valor={100}
                        valorColor="#EF4343"
                        color="#FDEEEF"
                        borderColor="#F5C2C4"
                        iconBackgroundColor="#F7C9CB"
                        iconColor="#E05252"
                        style={[styles.smallCard, styles.smallCardRight]}
                    />
                </View>

                <View style={styles.cardTransactionList}>
                    <CardTransaction
                        type="Entrada"
                        descricao="INSS"
                        banco="Nubank"
                        valor={1000}
                        data="2026-01-19"
                        onDelete={() => console.log('Remover entrada')}
                    />

                    <CardTransaction
                        type="Despesa"
                        descricao="Internet"
                        banco="Nubank"
                        valor={100}
                        data="2026-01-19"
                        onDelete={() => console.log('Remover despesa')}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}
