import { api } from '@/api/axios'

export async function cadastrarUsuario(nome: string, email: string, senha: string){
    const res = await api.post('/users', {
        nome,
        email,
        senha
    })
    return res.data
}

export async function loginUsuario(email: string, senha: string) {
    const res = await api.post("/auth/login", {
        email,
        senha
    });
    return res.data;
}