import { styles } from './TransacoesStyle';
import { StatusBar, View, Text, ScrollView, Modal, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Switch from '@/components/Switch/Switch'
import Input from "@/components/Input/Input";
import { useCallback, useState, useEffect } from "react";
import Select from '@/components/Select/Select'
import { useFocusEffect } from "expo-router";
import DateTimePicker from "@/components/DataTimePicker/DataTimePicker";
import Button from "@/components/Button/Button";
import { useHandleCategoria } from "@/handle/categoriaHandle";
import { useHandleBancos } from "@/handle/bancoHandle";
import { useHandleTransacoes } from "@/handle/transacaoHandle";
import { useHandleFormaPagamento } from "@/handle/formaPagamentoHandle";
import FeedbackModal from "@/components/FeedbackModal/FeedbackModal";
import AdditionModal from "@/components/AdditionModal/AdditionModal";

export default function Transacoes() {
    const { categoria, initCategoria, addCategoria, feedback: feedbackCategoria, setFeedback: setFeedbackCategoria } = useHandleCategoria();
    const { bancos, initBanco, addBanco, feedback: feedbackBanco, setFeedback: setFeedbackBanco } = useHandleBancos();
    const { formaPagamento, initFormaPagamento, handleSalvarNovaForma, feedback: feedbackForma, setFeedback: setFeedbackForma } = useHandleFormaPagamento();

    const [modalCadastro, setModalCadastro] = useState(false);
    const [salvandoForma, setSalvandoForma] = useState(false);
    const [formaSelecionada, setFormaSelecionada] = useState<{id: string; nome: string; cor: string} | null>(null);

    const [modalBanco, setModalBanco] = useState(false);
    const [salvandoBanco, setSalvandoBanco] = useState(false);
    const [bancoSelecionado, setBancoSelecionado] = useState<{id: string; nome: string; cor: string} | null>(null);

    const [modalCategoria, setModalCategoria] = useState(false);
    const [salvandoCategoria, setSalvandoCategoria] = useState(false);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState<{id: string; nome: string; cor: string} | null>(null);

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
        handleFormaPagamentoSelecionada,
        handleSalvar,
        initTransacao,
    } = useHandleTransacoes();

    useEffect(() => {
        setFormaSelecionada(null);
        setBancoSelecionado(null);
        setCategoriaSelecionada(null);
    }, [selectResetKey]);

    useFocusEffect(
        useCallback(() => {
            handleLimpar();
            initCategoria();
            initBanco();
            initTransacao();
            initFormaPagamento();
        }, [initCategoria, initBanco, handleLimpar, initTransacao, initFormaPagamento])
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
                        selectedValue={bancoSelecionado}
                        onSelect={(item) => {
                            setBancoSelecionado(item);
                            handleBancoSelecionado(item);
                        }}
                        placeholder="Selecione seu banco"
                        style={styles.size}
                        onAddNew={bancos.length === 0 ? () => setModalBanco(true) : undefined}
                        addNewLabel="Outro"
                    />

                    {mode === 'despesa' && (
                        <>
                            <Text style={styles.text}>Forma de Pagamento</Text>
                            <Select
                                key={`forma-pagamento-${selectResetKey}`}
                                options={formaPagamento
                                    .filter(f => f.nome !== 'Outro')
                                    .map(f => ({ id: String(f.id), nome: f.nome, cor: f.corHex }))
                                }
                                selectedValue={formaSelecionada}
                                onSelect={(item) => {
                                    setFormaSelecionada(item);
                                    handleFormaPagamentoSelecionada(item);
                                }}
                                placeholder="Selecione a forma de pagamento"
                                style={styles.size}
                                onAddNew={() => setModalCadastro(true)}
                                addNewLabel="Outro"
                            />

                            <Text style={styles.text}>Categoria</Text>
                            <Select
                                key={`categoria-${selectResetKey}`}
                                options={categoria.map((c) => ({
                                    id: String(c.id),
                                    nome: c.nome,
                                    cor: c.corHex
                                }))}
                                selectedValue={categoriaSelecionada}
                                onSelect={(item) => {
                                    setCategoriaSelecionada(item);
                                    handleCategoriaSelecionada(item);
                                }}
                                placeholder="Selecione a categoria"
                                style={styles.size}
                                onAddNew={categoria.length === 0 ? () => setModalCategoria(true) : undefined}
                                addNewLabel="Outro"
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

            <AdditionModal
                title="Forma de Pagamento"
                placeholder="Ex: Cartão de Crédito, Pix..."
                descricao="da Forma de Pagamento"
                visible={modalCadastro}
                onClose={() => setModalCadastro(false)}
                onAdd={async (payload) => {
                    await handleSalvarNovaForma(
                        payload.name,
                        payload.color,
                        (novaOption) => {
                            setFormaSelecionada(novaOption);
                            handleFormaPagamentoSelecionada(novaOption);
                            setModalCadastro(false);
                        },
                        setSalvandoForma
                    );
                }}
                loading={salvandoForma}
            />

            <AdditionModal
                title="Banco"
                placeholder="Ex: Nubank, Itaú..."
                descricao="do Banco"
                visible={modalBanco}
                onClose={() => setModalBanco(false)}
                onAdd={async (payload) => {
                    setSalvandoBanco(true);
                    const novo = await addBanco({ name: payload.name, color: payload.color });
                    setSalvandoBanco(false);
                    if (novo) {
                        const option = { id: String(novo.id), nome: novo.nome, cor: novo.corHex };
                        setBancoSelecionado(option);
                        handleBancoSelecionado(option);
                        setModalBanco(false);
                    }
                }}
                loading={salvandoBanco}
            />

            <AdditionModal
                title="Categoria"
                placeholder="Ex: Alimentação, Transporte..."
                descricao="da Categoria"
                visible={modalCategoria}
                onClose={() => setModalCategoria(false)}
                onAdd={async (payload) => {
                    setSalvandoCategoria(true);
                    const nova = await addCategoria({ name: payload.name, color: payload.color });
                    setSalvandoCategoria(false);
                    if (nova) {
                        const option = { id: String(nova.id), nome: nova.nome, cor: nova.corHex };
                        setCategoriaSelecionada(option);
                        handleCategoriaSelecionada(option);
                        setModalCategoria(false);
                    }
                }}
                loading={salvandoCategoria}
            />

            <FeedbackModal
                visible={!!(feedback || feedbackBanco || feedbackCategoria || feedbackForma)}
                title={(feedback ?? feedbackBanco ?? feedbackCategoria ?? feedbackForma)?.title ?? ""}
                description={(feedback ?? feedbackBanco ?? feedbackCategoria ?? feedbackForma)?.description ?? ""}
                onClose={() => { setFeedback(null); setFeedbackBanco(null); setFeedbackCategoria(null); setFeedbackForma(null); }}
            />
        </SafeAreaView>
    )
}
