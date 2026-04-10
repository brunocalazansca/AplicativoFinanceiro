import { styles } from './TransacoesStyle';
import { StatusBar, View, Text, ScrollView, Modal, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Switch from '@/components/Switch/Switch'
import Input from "@/components/Input/Input";
import { useCallback, useState } from "react";
import Select from '@/components/Select/Select'
import { useFocusEffect } from "expo-router";
import DateTimePicker from "@/components/DataTimePicker/DataTimePicker";
import Button from "@/components/Button/Button";
import { useHandleCategoria } from "@/handle/categoriaHandle";
import { useHandleBancos } from "@/handle/bancoHandle";
import { useHandleTransacoes } from "@/handle/transacaoHandle";
import { useHandleFormaPagamento } from "@/handle/formaPagamentoHandle";
import FeedbackModal from "@/components/FeedbackModal/FeedbackModal";
import { CORES } from "@/_utils/coresTransacoes"

export default function Transacoes() {
    const { categoria, initCategoria } = useHandleCategoria();
    const { bancos, initBanco } = useHandleBancos();
    const { formaPagamento, initFormaPagamento, handleSalvarNovaForma } = useHandleFormaPagamento();

    const [modalCadastro, setModalCadastro] = useState(false);
    const [novoNome, setNovoNome] = useState('');
    const [novaCor, setNovaCor] = useState('#2F6EF2');
    const [salvandoForma, setSalvandoForma] = useState(false);
    const [formaSelecionada, setFormaSelecionada] = useState<{id: string; nome: string; cor: string} | null>(null);

    const handleSalvarNovaFormaLocal = async () => {
        await handleSalvarNovaForma(
            novoNome,
            novaCor,
            (novaOption) => {
                setFormaSelecionada(novaOption);
                handleFormaPagamentoSelecionada(novaOption);
                setModalCadastro(false);
                setNovoNome('');
                setNovaCor('#2F6EF2');
            },
            setSalvandoForma
        );
    };

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
                        onSelect={handleBancoSelecionado}
                        placeholder="Selecione seu banco"
                        style={styles.size}
                    />

                    {mode === 'despesa' && (
                        <>
                            <Text style={styles.text}>Forma de Pagamento</Text>
                            <Select
                                key={`forma-pagamento-${selectResetKey}`}
                                options={[
                                    ...formaPagamento
                                        .filter(f => f.nome !== 'Outro')
                                        .map(f => ({ id: String(f.id), nome: f.nome, cor: f.corHex })),
                                    ...formaPagamento
                                        .filter(f => f.nome === 'Outro')
                                        .map(f => ({ id: String(f.id), nome: f.nome, cor: f.corHex })),
                                ]}
                                selectedValue={formaSelecionada}
                                onSelect={(item) => {
                                    if (item.nome === 'Outro') {
                                        setModalCadastro(true);
                                    } else {
                                        setFormaSelecionada(item);
                                        handleFormaPagamentoSelecionada(item);
                                    }
                                }}
                                placeholder="Selecione a forma de pagamento"
                                style={styles.size}
                            />

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

            <Modal visible={modalCadastro} transparent animationType="fade" onRequestClose={() => setModalCadastro(false)}>
                <TouchableOpacity style={modalStyles.overlay} activeOpacity={1} onPress={() => setModalCadastro(false)}>
                    <TouchableOpacity style={modalStyles.box} activeOpacity={1}>
                        <Text style={modalStyles.title}>Nova Forma de Pagamento</Text>

                        <TextInput
                            style={modalStyles.input}
                            placeholder="Nome"
                            value={novoNome}
                            onChangeText={setNovoNome}
                        />

                        <Text style={modalStyles.label}>Cor</Text>
                        <View style={modalStyles.cores}>
                            {CORES.map(cor => (
                                <TouchableOpacity
                                    key={cor}
                                    style={[modalStyles.corCirculo, { backgroundColor: cor }, novaCor === cor && modalStyles.corSelecionada]}
                                    onPress={() => setNovaCor(cor)}
                                />
                            ))}
                        </View>

                        <Button title={salvandoForma ? 'Salvando...' : 'Cadastrar'} onPress={handleSalvarNovaFormaLocal} />
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>

            <FeedbackModal
                visible={!!feedback}
                title={feedback?.title ?? ""}
                description={feedback?.description ?? ""}
                onClose={() => setFeedback(null)}
            />
        </SafeAreaView>
    )
}

const modalStyles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        backgroundColor: '#fff',
        width: '85%',
        borderRadius: 14,
        padding: 24,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 16,
        marginBottom: 16,
        color: '#1F2937',
    },
    label: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 10,
    },
    cores: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginBottom: 20,
    },
    corCirculo: {
        width: 36,
        height: 36,
        borderRadius: 18,
    },
    corSelecionada: {
        borderWidth: 3,
        borderColor: '#1F2937',
    },
});
