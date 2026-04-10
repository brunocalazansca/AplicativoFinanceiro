import { useCallback, useState } from "react";
import { getSession } from "@/storage/authStorage";
import { setToken } from "@/api/authToken";
import { FormaPagamentoApi } from "@/_utils/typeFormaPagamentoApi";
import { criarFormaPagamento, obterFormaPagamento } from "@/services/formaPagamentoService";

export function useHandleFormaPagamento() {
    const [formaPagamento, setFormaPagamento] = useState<FormaPagamentoApi[]>([]);
    const [loadingFormaPagamento, setLoadingFormaPagamento] = useState(false);

    const loadFormaPagamento = useCallback(async () => {
        try {
            setLoadingFormaPagamento(true);
            const data = await obterFormaPagamento();
            setFormaPagamento(data);
        } catch (err: any) {
            setFormaPagamento([]);
        } finally {
            setLoadingFormaPagamento(false);
        }
    }, []);

    const initFormaPagamento = useCallback(async () => {
        const session = await getSession();
        await setToken(session?.token ?? null);

        if (session?.token) {
            await loadFormaPagamento();
        }
    }, [loadFormaPagamento]);

    const criarNovaFormaPagamento = useCallback(async (nome: string, corHex: string) => {
        const nova = await criarFormaPagamento(nome, corHex);
        setFormaPagamento(prev => [...prev, nova]);
        return nova;
    }, []);

    const handleSalvarNovaForma = useCallback(async (
        nome: string,
        corHex: string,
        onSuccess: (option: { id: string; nome: string; cor: string }) => void,
        setSalvando: (v: boolean) => void
    ) => {
        if (!nome.trim()) return;
        try {
            setSalvando(true);
            const nova = await criarNovaFormaPagamento(nome.trim(), corHex);
            onSuccess({ id: String(nova.id), nome: nova.nome, cor: nova.corHex });
        } finally {
            setSalvando(false);
        }
    }, [criarNovaFormaPagamento]);

    return {
        formaPagamento,
        loadingFormaPagamento,
        loadFormaPagamento,
        initFormaPagamento,
        criarNovaFormaPagamento,
        handleSalvarNovaForma,
    };
}