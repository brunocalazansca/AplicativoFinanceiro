import {ResumoApi} from "@/_utils/typeResumoApi";
import { api } from "@/api/axios";

export const obterResumoTransacoes = async (): Promise<ResumoApi> => {
    const response = await api.get<ResumoApi>('/transacao/resumo');
    return response.data;
};