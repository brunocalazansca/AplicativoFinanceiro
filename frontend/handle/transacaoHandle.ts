import { useCallback, useEffect, useState } from "react";
import { getSession } from "@/storage/authStorage";
import { setToken } from "@/api/authToken";
import { FeedbackState } from "@/_utils/typeFeedback";
import { TransacaoApi, TransacaoPayload } from "@/_utils/typeTransacaoApi";
import { SwitchMode } from "@/_utils/typeAuthMode";
import { SelectOption } from "@/_utils/selectOptions";
import { formatarData, formatarValor } from "@/_utils/formatValuesTransacao";
import {
    cadastrarTransacao,
    deletarTransacao,
    listarTodasTransacoes,
    listarTransacoesPorBanco
} from "@/services/transacaoService";

export function useHandleTransacoes() {
    const [session, setSession] = useState<Awaited<ReturnType<typeof getSession>>>(null);
    const [transacoes, setTransacoes] = useState<TransacaoApi[]>([]);
    const [feedback, setFeedback] = useState<FeedbackState | null>(null);
    const [loadingList, setLoadingList] = useState(false);
    const [loadingAction, setLoadingAction] = useState(false);

    const [mode, setMode] = useState<SwitchMode>("entrada");
    const [valor, setValor] = useState('');
    const [descricao, setDescricao] = useState('');
    const [selectResetKey, setSelectResetKey] = useState(0);
    const [dataTransacao, setDataTransacao] = useState<Date | null>(null);
    const [bancoSelecionado, setBancoSelecionado] = useState<number | null>(null);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState<number | null>(null);


    useEffect(() => {
        if (!feedback) return;
        const t = setTimeout(() => setFeedback(null), 2500);
        return () => clearTimeout(t);
    }, [feedback]);

    const handleLimpar = useCallback(() => {
        setValor('');
        setDescricao('');
        setDataTransacao(null);
        setBancoSelecionado(null);
        setCategoriaSelecionada(null);
        setSelectResetKey(prev => prev + 1);
    }, []);

    const handleBancoSelecionado = useCallback((item: SelectOption) => {
        setBancoSelecionado(Number(item.id));
    }, []);

    const handleCategoriaSelecionada = useCallback((item: SelectOption) => {
        setCategoriaSelecionada(Number(item.id));
    }, []);

    const loadTransacoes = useCallback(async (bancoId?: number) => {
        try {
            setLoadingList(true);
            let data: TransacaoApi[];

            if (bancoId) {
                data = await listarTransacoesPorBanco(String(bancoId));
            } else {
                data = await listarTodasTransacoes();
            }

            setTransacoes(data);
        } catch {
            return;
        } finally {
            setLoadingList(false);
        }
    }, []);

    const initTransacao = useCallback(async (bancoId?: number) => {
        const session = await getSession();

        setSession(session);
        await setToken(session?.token ?? null);

        if (session?.token) {
            await loadTransacoes(bancoId);
        } else {
            setFeedback({
                title: "Sessão expirada Matheus!",
                description: "Faça login novamente."
            });
        }
    }, [loadTransacoes]);

    // const initBanco = useCallback(async () => {
    //     const session = await getSession();
    //     setSession(session);
    //     await setToken(session?.token ?? null);
    //
    //     if (session?.token) {
    //         await loadBancos();
    //     } else {
    //         setFeedback({
    //             title: "Sessão expirada!",
    //             description: "Faça login novamente.",
    //         });
    //     }
    // }, [loadBancos]);

    const adicionarTransacao = useCallback(
        async (payload: TransacaoPayload) => {
            try {
                if (!session?.token) {
                    setFeedback({
                        title: "Sessão expirada Bruno!",
                        description: "Faça login novamente.",
                    });
                    return null;
                }

                setLoadingAction(true);

                const novaTransacao = await cadastrarTransacao(payload);

                setTransacoes((prev) => [novaTransacao, ...prev]);
                setFeedback({ title: "Transação salva com sucesso!" });

                return novaTransacao;
            } catch (err: any) {
                const status = err?.response?.status;

                    if (status === 403) {
                        setFeedback({
                            title: "Sessão expirada 403!",
                            description: "Faça login novamente."
                        });
                        return null;
                } else if (status === 400) {
                    setFeedback({
                        title: "Verifique os dados preenchidos e tente novamente."
                    });
                    return null;
                }

                const msg = err?.response?.data?.message ?? err?.message ?? String(err);

                setFeedback({
                    title: `Erro ao salvar transação: ${msg}`
                });

                return null;
            } finally {
                setLoadingAction(false);
            }
        }, [session?.token]
    );

    const handleSalvar = useCallback(async () => {
        if (!valor || !descricao || bancoSelecionado == null || dataTransacao == null) {
            setFeedback({ title: "Preencha todos os campos obrigatórios!" });
            return;
        }

        const tipoMovimentacao: TransacaoPayload["tipoMovimentacao"] = mode === "entrada" ? "ENTRADA" : "DESPESA";

        const base = {
            valor: formatarValor(valor),
            descricao: descricao.trim(),
            bancoId: bancoSelecionado,
            data: formatarData(dataTransacao),
        };

        let payload: TransacaoPayload;

        if (tipoMovimentacao === "ENTRADA") {
            payload = { ...base, tipoMovimentacao: "ENTRADA" };
        } else {
            if (categoriaSelecionada == null) {
                setFeedback({ title: "Selecione uma categoria para a despesa!" });
                return;
            }

            payload = {
                ...base,
                tipoMovimentacao: "DESPESA",
                categoriaId: categoriaSelecionada,
            };
        }

        const sucesso = await adicionarTransacao(payload);
        if (sucesso) handleLimpar();
    }, [
        valor,
        descricao,
        bancoSelecionado,
        dataTransacao,
        mode,
        categoriaSelecionada,
        adicionarTransacao,
        handleLimpar,
    ]);

    const deleteTransacao = useCallback(async (id: number) => {
        try {
            if (!session?.token) {
                setFeedback({ title: "Sessão expirada!", description: "Faça login novamente." });
                return;
            }

            setLoadingAction(true);
            const response = await deletarTransacao(id);

            setTransacoes((prev) => prev.filter((t) => t.id !== id));
            setFeedback({ title: `Transação "${response.descricao}" deletada!` });

        } catch (err: any) {
            const msg = err?.response?.data?.message ?? err?.message ?? String(err);
            setFeedback({ title: `Erro ao deletar transação: ${msg}` });
        } finally {
            setLoadingAction(false);
        }
    }, [session?.token]);

    return {
        transacoes,
        feedback,
        setFeedback,
        loadingList,
        loadingAction,
        mode,
        setMode,
        valor,
        setValor,
        descricao,
        setDescricao,
        selectResetKey,
        dataTransacao,
        setDataTransacao,
        initTransacao,
        loadTransacoes,
        deleteTransacao,
        handleLimpar,
        handleBancoSelecionado,
        handleCategoriaSelecionada,
        handleSalvar
    };
}