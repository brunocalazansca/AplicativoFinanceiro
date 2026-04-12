import { api } from "@/api/axios";
import { RelatorioApi, RelatorioFiltro } from "@/_utils/typeRelatorioApi";

type RelatorioParams = {
    filtro: RelatorioFiltro;
    mes?: number;
    ano?: number;
    dataInicio?: string;
    dataFim?: string;
};

export const obterRelatorio = async (params: RelatorioParams): Promise<RelatorioApi> => {
    const response = await api.get<RelatorioApi>('/relatorio', { params });
    return response.data;
};
