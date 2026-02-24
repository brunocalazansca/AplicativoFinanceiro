import {api} from "@/api/axios";
import { TransacaoApi, TransacaoPayload } from "@/_utils/typeTransacaoApi";

export const cadastrarTransacao = async (payload: TransacaoPayload): Promise<TransacaoApi> => {
    const { data } = await api.post<TransacaoApi>('/transacao', payload);
    return data;
};

export const listarTransacoesPorBanco = async (idBanco: string): Promise<TransacaoApi[]> => {
    const response = await api.get<TransacaoApi[]>(`/transacao`, {
        params: { 'id-banco': idBanco }
    });
    return response.data;
};

export const listarTodasTransacoes = async (): Promise<TransacaoApi[]> => {
    const response = await api.get<TransacaoApi[]>('/transacao');
    return response.data;
};

export const deletarTransacao = async (idTransacao: number): Promise<{ descricao: string }> => {
    const response = await api.delete<{ descricao: string }>('/transacao', {
        params: { 'id-transacao': idTransacao }
    });
    return response.data;
};

