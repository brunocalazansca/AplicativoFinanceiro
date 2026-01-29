import { StatusBar, View, Text } from 'react-native';
import { styles } from './HomeStyle';
import Card from '../../components/Card/Card';
import CardTransaction from "@/components/CardTransaction/CardTransaction";
import { SafeAreaView } from 'react-native-safe-area-context';
import { HOME_MOCK } from "@/data/home";

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
                    valor={HOME_MOCK.saldoTotal}
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
                        {...HOME_MOCK.cards.entradas}
                        style={[styles.smallCard, styles.smallCardLeft]}
                    />

                    <Card
                        {...HOME_MOCK.cards.despesas}
                        style={[styles.smallCard, styles.smallCardRight]}
                    />
                </View>

                <View style={styles.cardTransactionList}>
                    {HOME_MOCK.recentes.map((t) => (
                        <CardTransaction
                            key={t.id}
                            type={t.type}
                            descricao={t.descricao}
                            banco={t.banco}
                            valor={t.valor}
                            data={t.data}
                            onDelete={() => console.log("Remover", t.id)}
                        />
                    ))}
                </View>
            </View>
        </SafeAreaView>
    );
}
