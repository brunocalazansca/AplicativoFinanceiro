import { useCallback, useEffect, useState } from "react";
import { getSession } from "@/storage/authStorage";
import { setToken } from "@/api/authToken";
import { cadastrarBanco, deletarBanco, listarBancos } from "@/services/bancoService";
import { FeedbackState } from "@/_utils/typeFeedback";
import { BancoApi } from "@/_utils/typeBancoApi";

type AddBancoInput = { name: string; color: string };

export function useHandleBancos() {
    const [session, setSession] = useState<Awaited<ReturnType<typeof getSession>>>(null);

    const [bancos, setBancos] = useState<BancoApi[]>([]);
    const [feedback, setFeedback] = useState<FeedbackState | null>(null);

    const [loadingList, setLoadingList] = useState(false);
    const [loadingAction, setLoadingAction] = useState(false);

    // auto-fecha feedback
    useEffect(() => {
        if (!feedback) return;
        const t = setTimeout(() => setFeedback(null), 2500);
        return () => clearTimeout(t);
    }, [feedback]);

    const loadBancos = useCallback(async () => {
        try {
            setLoadingList(true);
            const data = await listarBancos();
            setBancos(data);
        } catch (err: any) {
            setFeedback({ title: `Erro ao listar bancos: ${err?.message ?? err}` });
        } finally {
            setLoadingList(false);
        }
    }, []);

    // Inicializa sessão + token + lista bancos
    const init = useCallback(async () => {
        const s = await getSession();
        setSession(s);
        await setToken(s?.token ?? null);

        if (s?.token) {
            await loadBancos();
        } else {
            setFeedback({
                title: "Sessão expirada!",
                description: "Faça login novamente.",
            });
        }
    }, [loadBancos]);

    const addBanco = useCallback(
        async ({ name, color }: AddBancoInput) => {
            try {
                if (!session?.token) {
                    setFeedback({
                        title: "Sessão expirada!",
                        description: "Faça login novamente.",
                    });
                    return null;
                }

                setLoadingAction(true);
                const novoBanco = await cadastrarBanco(name, color);

                setBancos((prev) => [novoBanco, ...prev]);
                setFeedback({ title: `${novoBanco.nome} cadastrado com sucesso!` });

                return novoBanco;
            } catch (err: any) {
                const status = err?.response?.status;

                if (status === 409) {
                    setFeedback({ title: "Este banco já está cadastrado." });
                    return null;
                }

                const msg =
                    err?.response?.data?.message ??
                    err?.message ??
                    String(err);

                setFeedback({ title: `Erro ao cadastrar banco: ${msg}` });
                return null;
            } finally {
                setLoadingAction(false);
            }
        },
        [session?.token]
    );

    const deleteBanco = useCallback(
        async (id: number) => {
            try {
                if (!session?.token) {
                    setFeedback({
                        title: "Sessão expirada!",
                        description: "Faça login novamente.",
                    });
                    return;
                }

                setLoadingAction(true);
                const removido = await deletarBanco(id);

                setBancos((prev) => prev.filter((b) => b.id !== id));
                setFeedback({ title: `${removido.nome} deletado com sucesso!` });
            } catch (err: any) {
                const msg =
                    err?.response?.data?.message ??
                    err?.message ??
                    String(err);

                setFeedback({ title: `Erro ao deletar o banco: ${msg}` });
            } finally {
                setLoadingAction(false);
            }
        },
        [session?.token]
    );

    return {
        bancos,
        feedback,
        setFeedback,
        loadingList,
        loadingAction,
        init,
        loadBancos,
        addBanco,
        deleteBanco,
    };
}
