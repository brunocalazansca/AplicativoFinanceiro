import { api } from '@/api/axios'
import { clearSession, getSession, saveSession } from "@/storage/authStorage";
import { getInitials } from "@/_utils/getInitials";

export async function cadastrarUsuario(nome: string, email: string, senha: string){
    const res = await api.post('/users', {
        nome,
        email,
        senha
    })
    return res.data
}

export async function login(email: string, senha: string) {
    const res = await api.post("/auth/login", {
        email,
        senha
    });

    await saveSession(res.data);

    return res.data;
}

export async function getNomeUsuarioLogado() {
    const session = await getSession();
    const nome = session?.user?.nome || "";

    return getInitials(nome);
}

export async function logout() {
    await clearSession();
}


export async function skipLogin() {
    const session = await getSession();
    if (!session?.token) return null;
    return session;
}