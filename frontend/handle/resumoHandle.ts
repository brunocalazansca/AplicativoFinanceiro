import { useCallback, useState } from "react";
import { getSession } from "@/storage/authStorage";
import { setToken } from "@/api/authToken";
import { obterResumoTransacoes } from "@/services/resumoService";
import { ResumoApi } from "@/_utils/typeResumoApi";

export function useHandleResumo() {
    const [resumo, setResumo] = useState<ResumoApi | null>(null);
    const [loadingResumo, setLoadingResumo] = useState(false);

    const loadResumo = useCallback(async () => {
        try {
            setLoadingResumo(true);
            const data = await obterResumoTransacoes();
            setResumo(data);
        } catch (err: any) {
            setResumo({
                saldoTotal: 0,
                entradas: 0,
                despesas: 0
            });
        } finally {
            setLoadingResumo(false);
        }
    }, []);

    const initResumo = useCallback(async () => {
        const session = await getSession();
        await setToken(session?.token ?? null);

        if (session?.token) {
            await loadResumo();
        }
    }, [loadResumo]);

    return {
        resumo,
        loadingResumo,
        loadResumo,
        initResumo
    };
}