import { useCallback, useEffect, useState } from "react";
import { getSession } from "@/storage/authStorage";
import { setToken } from "@/api/authToken";
import { CategoriaApi } from "@/_utils/typeCategoriaApi";
import { FeedbackState } from "@/_utils/typeFeedback";
import {cadastrarCategoria, deletarCategoria, listarCategoria} from "@/services/categoriaService";

type AddCategoriaInput = {
    name: string;
    color: string;
}

export function useHandleCategoria () {
    const [session, setSession] = useState<Awaited<ReturnType<typeof getSession>>>(null);

    const [categoria, setCategoria] = useState<CategoriaApi[]>([]);
    const [feedback, setFeedback] = useState<FeedbackState | null>(null);

    const [loadingList, setLoadingList] = useState(false);
    const [loadingAction, setLoadingAction] = useState(false);

    useEffect(() => {
        if (!feedback) return;
        const t = setTimeout(() => setFeedback(null), 2500);
        return () => clearTimeout(t);
    }, [feedback]);

    const loadCategoria = useCallback(async () => {
        try {
            setLoadingList(true);
            const data = await listarCategoria();
            setCategoria(data);
        } catch {
            return;
        } finally {
            setLoadingList(false);
        }
    }, []);

    // Inicializa sessão + token + lista de categorias
    const initCategoria = useCallback(async () => {
        const session = await getSession();
        setSession(session);
        await setToken(session?.token ?? null);

        if (session?.token) {
            await loadCategoria();
        } else {
            setFeedback({
                title: "Sessão expirada!",
                description: "Faça login novamente.",
            });
        }
    }, [loadCategoria]);

    const addCategoria = useCallback(
        async ({ name, color }: AddCategoriaInput) => {
            try {
                if (!session?.token) {
                    setFeedback({
                        title: "Sessão expirada!",
                        description: "Faça login novamente.",
                    });
                    return null;
                }

                setLoadingAction(true);
                const novaCategoria = await cadastrarCategoria(name, color);

                setCategoria((prev) => [novaCategoria, ...prev]);
                setFeedback({ title: `${novaCategoria.nome} cadastrado com sucesso!` });

                return novaCategoria;
            } catch (err: any) {
                const status = err?.response?.status;

                if (status === 409) {
                    setFeedback({title: "Esta categoria já está cadastrada."});
                    return null;

                } else if (status === 403) {
                    setFeedback({
                        title: "Sessão expirada!",
                        description: "Faça login novamente.",
                    });
                    return null;
                }

                const msg =
                    err?.response?.data?.message ??
                    err?.message ??
                    String(err);

                setFeedback({ title: `Erro ao cadastrar categoria: ${msg}` });

                return null;
            } finally {
                setLoadingAction(false);
            }
        },
        [session?.token]
    );

    const deleteCategoria = useCallback(
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
                const removido = await deletarCategoria(id);

                setCategoria((prev) => prev.filter((c) => c.id !== id));
                setFeedback({ title: `${removido.nome} deletado com sucesso!` });
            } catch (err: any) {
                const msg =
                    err?.response?.data?.message ??
                    err?.message ??
                    String(err);

                setFeedback({ title: `Erro ao deletar a categoria: ${msg}` });
            } finally {
                setLoadingAction(false);
            }
        },
        [session?.token]
    );

    return {
        categoria,
        feedback,
        setFeedback,
        loadingList,
        loadingAction,
        initCategoria,
        loadCategoria,
        addCategoria,
        deleteCategoria,
    };
}