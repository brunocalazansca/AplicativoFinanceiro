import { useCallback, useState } from "react";
import { getSession } from "@/storage/authStorage";
import { setToken } from "@/api/authToken";
import { FormaPagamentoApi } from "@/_utils/typeFormaPagamentoApi";
import { obterFormaPagamento } from "@/services/formaPagamentoService";

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

    return {
        formaPagamento,
        loadingFormaPagamento,
        loadFormaPagamento,
        initFormaPagamento
    };
}