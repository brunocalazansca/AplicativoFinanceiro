import { styles } from './TransacoesStyle';
import { StatusBar, View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Switch from '@/components/Switch/Switch'
import Input from "@/components/Input/Input";
import { useCallback } from "react";
import Select from '@/components/Select/Select'
import { useFocusEffect } from "expo-router";
import DateTimePicker from "@/components/DataTimePicker/DataTimePicker";
import Button from "@/components/Button/Button";
import { useHandleCategoria } from "@/handle/categoriaHandle";
import { useHandleBancos } from "@/handle/bancoHandle";
import { useHandleTransacoes } from "@/handle/transacaoHandle";
import FeedbackModal from "@/components/FeedbackModal/FeedbackModal";

export default function Transacoes() {
    const { categoria, initCategoria } = useHandleCategoria();
    const { bancos, initBanco } = useHandleBancos();

    const {
        mode,
        setMode,
        valor,
        setValor,
        descricao,
        setDescricao,
        dataTransacao,
        setDataTransacao,
        selectResetKey,
        feedback,
        setFeedback,
        handleLimpar,
        handleBancoSelecionado,
        handleCategoriaSelecionada,
        handleSalvar,
        initTransacao,
    } = useHandleTransacoes();

    useFocusEffect(
        useCallback(() => {
            handleLimpar();
            initCategoria();
            initBanco();
            initTransacao();
        }, [initCategoria, initBanco, handleLimpar, initTransacao])
    );

    return (
        <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

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
                        placeholder="Ex: Compra no mercado..."
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
                        title={mode === 'entrada' ? "Adicionar Entrada" : "Adicionar Despesa"}
                        onPress={handleSalvar}
                    />

                    <Button
                        title="Limpar"
                        textColor="#2F6EF2"
                        onPress={handleLimpar}
                        style={styles.limparBtn}
                    />
                </View>
            </ScrollView>

            <FeedbackModal
                visible={!!feedback}
                title={feedback?.title ?? ""}
                description={feedback?.description ?? ""}
                onClose={() => setFeedback(null)}
            />
        </SafeAreaView>
    )
}