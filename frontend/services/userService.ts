import { api } from '@/api/axios'
import { clearSession, getSession, saveSession } from "@/storage/authStorage";
import { getInitials } from "@/_utils/getInitials";

export async function cadastrarUsuario(nome: string, email: string, senha: string){
    const res = await api.post('/users', {
        nome,
        email,
        senha
    })

    if (res?.data?.id) {
        await login(email, senha);
    }

    return res.data
}

export async function login(email: string, senha: string) {
    const res = await api.post("/auth/login", {
        email,
        senha
    });

    await saveSession(res.data);

    const type = res.data.tokenType ?? "Bearer";
    api.defaults.headers.common.Authorization = `${type} ${res.data.token}`;

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

export async function atualizarUsuario(nome: string, email: string, senha?: string) {
    const res = await api.put('/users/me', { nome, email, ...(senha ? { senha } : {}) });
    const session = await getSession();
    if (session) {
        await saveSession({ ...session, user: { id: res.data.id, nome: res.data.nome, email: res.data.email } });
    }
    return res.data;
}

export async function excluirConta() {
    await api.delete('/users/me');
    await clearSession();
}

export async function skipLogin() {
    const session = await getSession();
    if (!session?.token) return null;
    return session;
}