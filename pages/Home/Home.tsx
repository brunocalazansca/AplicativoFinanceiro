import { SafeAreaView, StatusBar, View } from 'react-native';
import { styles } from './Home.style';
import Card from '../../components/Card/Card';

export default function Home() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.content}>
                <Card
                    title="Saldo Total"
                    icon="credit-card"
                    valor={2330}
                    color="#E6EEFF"
                    borderColor="#CADBFF"
                    iconBackgroundColor="#CBD9FF"
                    iconColor="#3654B3"
                    style={styles.balanceCard}
                />

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
            </View>
        </SafeAreaView>
    );
}
