import { SwitchMode } from '@/_utils/typeAuthMode'

export function validateAuthForm(params: {
    mode: SwitchMode;
    nome: string;
    email: string;
    senha: string;
}): string | null {
    const {
        mode,
        nome,
        email,
        senha
    } = params;

    if (mode === "cadastro" && !nome.trim()) {
        return "Informe o seu nome.";
    }

    if (!email.trim()) {
        return "Informe o seu email.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        return "Insira um email válido";
    }

    if (!senha.trim() || senha.length < 6){
        return "Sua senha deve conter ao menos 6 caracteres.";
    }

    return null;
}