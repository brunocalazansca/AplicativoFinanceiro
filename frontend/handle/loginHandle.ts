import { useCallback, useEffect, useRef, useState } from "react";
import { router, type Href } from "expo-router";
import { cadastrarUsuario, login } from "@/services/userService";
import { validateAuthForm } from "@/_utils/validationFormData";
import { SwitchMode } from "@/_utils/typeAuthMode";
import { FeedbackState } from "@/_utils/typeFeedback";

type AuthForm = {
    mode: SwitchMode;
    nome: string;
    email: string;
    senha: string;
};

export function useHandleLogin() {
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState<FeedbackState | null>(null);

    // evita setState após unmount
    const mountedRef = useRef(true);
    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        };
    }, []);

    // auto-fecha feedback em 2.5s
    useEffect(() => {
        if (!feedback) return;
        const t = setTimeout(() => {
            if (mountedRef.current) setFeedback(null);
        }, 2500);
        return () => clearTimeout(t);
    }, [feedback]);

    const goToHome = useCallback(() => {
        router.replace("/(tabs)/home" as Href);
    }, []);

    const aguardarENavegar = useCallback(() => {
        setTimeout(() => {
            if (!mountedRef.current) return;
            setFeedback(null);
            goToHome();
        }, 3000);
    }, [goToHome]);

    const handleSubmit = useCallback(async ({ mode, nome, email, senha }: AuthForm) => {
        const err = validateAuthForm({ mode, nome, email, senha });
        if (err) {
            setFeedback({ title: err });
            return;
        }

        try {
            setLoading(true);

            if (mode === "cadastro") {
                await cadastrarUsuario(nome.trim(), email.trim(), senha);

                setFeedback({
                    title: "Cadastro realizado!",
                    description: "Sua conta foi criada com sucesso",
                });

                aguardarENavegar();
                return;
            }

            await login(email.trim(), senha);

            setFeedback({
                title: "Login realizado!",
                description: "Bem-vindo de volta.",
            });

            aguardarENavegar();
        } catch (err: any) {
            const msg =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                err?.message ||
                "Erro ao comunicar com o servidor.";

            setFeedback({ title: msg });
        } finally {
            if (mountedRef.current) setLoading(false);
        }
    }, [aguardarENavegar]);

    return {
        loading,
        feedback,
        setFeedback,
        handleSubmit,
    };
}
