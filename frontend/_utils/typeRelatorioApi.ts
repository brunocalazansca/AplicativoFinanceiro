export type DespesaPorCategoriaApi = {
    categoriaId: number;
    categoriaNome: string;
    corHex: string;
    total: number;
};

export type DespesaPorBancoApi = {
    bancoId: number;
    bancoNome: string;
    corHex: string;
    total: number;
};

export type RelatorioApi = {
    periodoLabel: string;
    balanco: number;
    totalEntradas: number;
    totalDespesas: number;
    despesasPorCategoria: DespesaPorCategoriaApi[];
    despesasPorBanco: DespesaPorBancoApi[];
};

export type RelatorioFiltro =
    | 'MES_ATUAL'
    | 'ULTIMOS_30_DIAS'
    | 'ESTE_ANO'
    | 'MES_ESPECIFICO'
    | 'RANGE';
