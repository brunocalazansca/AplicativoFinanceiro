import { api } from "@/api/axios";
import {BancoApi} from "@/_utils/typeBancoApi";

export async function cadastrarBanco(nome: string, corHex: string): Promise<BancoApi> {
    const { data } = await api.post<BancoApi>("/bancos", { nome, corHex });
    return data;
}

export async function listarBancos(): Promise<BancoApi[]> {
    const { data } = await api.get<BancoApi[]>("/bancos");
    return data;
}

export async function deletarBanco(idBanco: number): Promise<{ nome: string }> {
    const { data } = await api.delete<{ Nome: string }>("/bancos", {
        params: { "id-banco": idBanco },
    });

    return { nome: data.Nome };
}