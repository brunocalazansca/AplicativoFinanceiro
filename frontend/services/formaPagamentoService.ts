import { FormaPagamentoApi } from "@/_utils/typeFormaPagamentoApi";
import { api } from "@/api/axios";

export const obterFormaPagamento = async (): Promise<FormaPagamentoApi[]> => {
    const response = await api.get<FormaPagamentoApi[]>('/forma-pagamento');
    return response.data;
};

export const criarFormaPagamento = async (nome: string, corHex: string): Promise<FormaPagamentoApi> => {
    const response = await api.post<FormaPagamentoApi>('/forma-pagamento', { nome, corHex });
    return response.data;
};