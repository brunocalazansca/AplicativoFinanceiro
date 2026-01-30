import { styles } from './BancosStyle';
import {StatusBar, Text, View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/Button/Button";
import AdditionModal from "@/components/AdditionModal/AdditionModal";
import BankCard from "@/components/BankCard/BankCard";
import { useState } from "react";
import {router} from "expo-router";
import { BANKS } from "@/data/bancos";

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
                {BANKS.map((b) => (
                    <BankCard
                        key={b.id}
                        name={b.nome}
                        amount={b.saldo}
                        transactionsCount={b.transacoes.length}
                        color={b.cor}
                        onPress={() =>
                            router.push({
                                pathname: "/bancos/[nome]",
                                params: { nome: b.nome },
                            })
                        }
                        onDelete={() => console.log("Excluir banco")}
                        style={styles.card}
                    />
                ))}
            </View>

            <AdditionModal
                title="Banco"
                placeholder="Ex: Nubank, Itaú..."
                descricao="do Banco"
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