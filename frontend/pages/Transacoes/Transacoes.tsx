import { styles } from './TransacoesStyle';
import {StatusBar, View, Text, ScrollView} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Switch from '@/components/Switch/Switch'
import Input from "@/components/Input/Input";
import { useCallback, useState } from "react";
import { SwitchMode } from "@/_utils/typeAuthMode";
import Select from '@/components/Select/Select'
import { SelectOption } from "@/_utils/selectOptions";
import { useFocusEffect } from "expo-router";
import DateTimePicker from "@/components/DataTimePicker/DataTimePicker";
import Button from "@/components/Button/Button";
import {useHandleCategoria} from "@/handle/categoriaHandle";
import {useHandleBancos} from "@/handle/bancosHandle";

export default function Transacoes() {
    const [mode, setMode] = useState<SwitchMode>("entrada");
    const [valor, setValor] = useState('');
    const [descricao, setDescricao] = useState('');
    const [selectResetKey, setSelectResetKey] = useState(0);
    const [dataTransacao, setDataTransacao] = useState<Date | null>(null);

    const handleLimpar = () => {
        setValor('');
        setDescricao('');
        setDataTransacao(null);
        setSelectResetKey(prev => prev + 1);
    };

    const {
        categoria,
        initCategoria,
    } = useHandleCategoria();

    const {
        bancos,
        initBanco,
    } = useHandleBancos();

    useFocusEffect(
        useCallback(() => {
            setSelectResetKey(prev => prev + 1);
            setDataTransacao(null);
            initCategoria();
            initBanco();
        }, [initCategoria, initBanco])
    );

    const handleBancoSelecionado = (item: SelectOption) => {
        console.log("Banco escolhido: ", item.nome);
    };

    const handleCategoriaSelecionada = (item: SelectOption) => {
        console.log("Categoria escolhida: ", item.nome);
    };

    return (
        <SafeAreaView
            style={styles.container}
            edges={["left", "right", "bottom"]}
        >
            <StatusBar
                barStyle="dark-content"
                backgroundColor="#FFFFFF"
            />

            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.switch}>
                    <Switch
                        textEsquerda="Entrada"
                        textDireita="Despesa"
                        value={mode}
                        leftValue="entrada"
                        rightValue="despesa"
                        onChange={setMode}
                    />
                </View>
                <View style={styles.content}>
                    <Text style={styles.text}>Valor</Text>
                    <Input
                        placeholder="R$ 0,00"
                        icon="dollar-sign"
                        type="numeric"
                        value={valor}
                        onChangeText={setValor}
                        style={styles.size}
                    />

                    <Text style={styles.text}>Descrição</Text>
                    <Input
                        placeholder="Ex: Compra no merdado..."
                        icon="book-open"
                        type="text"
                        value={descricao}
                        onChangeText={setDescricao}
                        style={styles.size}
                    />

                    <Text style={styles.text}>Banco</Text>
                    <Select
                        key={`banco-${selectResetKey}`}
                        options={bancos.map((b) => ({
                            id: String(b.id),
                            nome: b.nome,
                            cor: b.corHex
                        }))}
                        onSelect={handleBancoSelecionado}
                        placeholder="Selecione seu banco"
                        style={styles.size}
                    />

                    {mode === 'despesa' && (
                        <>
                            <Text style={styles.text}>Categoria</Text>
                            <Select
                                key={`categoria-${selectResetKey}`}
                                options={categoria.map((c) => ({
                                    id: String(c.id),
                                    nome: c.nome,
                                    cor: c.corHex
                                }))}
                                onSelect={handleCategoriaSelecionada}
                                placeholder="Selecione a categoria"
                                style={styles.size}
                            />
                        </>
                    )}

                </View>

                <View style={styles.footer}>
                    <Text style={styles.textData}>Data</Text>
                    <DateTimePicker
                        mode="date"
                        value={dataTransacao}
                        onChange={setDataTransacao}
                        placeholder="dd/mm/aaaa"
                    />

                    <Button
                        title="Adicionar Despesa"
                        onPress={() => console.log('Despesa adicionada')}
                    />

                    <Button
                        title="Limpar"
                        textColor="#2F6EF2"
                        onPress={handleLimpar}
                        style={styles.limparBtn}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}