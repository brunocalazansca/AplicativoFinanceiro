import { api } from "@/api/axios";
import { CategoriaApi } from "@/_utils/typeCategoriaApi";

export async function cadastrarCategoria(nome: string, corHex: string): Promise<CategoriaApi> {
    const { data } = await api.post<CategoriaApi>("/categorias", { nome, corHex });
    return data;
}

export async function listarCategoria(): Promise<CategoriaApi[]> {
    const { data } = await api.get<CategoriaApi[]>("/categorias");
    return data;
}

export async function deletarCategoria(idCategoria: number): Promise<{ nome: string }> {
    const { data } = await api.delete<{ nome: string }>("/categorias", {
        params: { "id-categoria": idCategoria },
    });

    return { nome: data.nome };
}