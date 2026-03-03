export type TransacaoApi = {
    id: number;
    descricao: string;
    tipoMovimentacao: 'ENTRADA' | 'DESPESA';
    valor: number;
    data: string;
    bancoId: string;
    formaPagamentoId: number;
};

type TransacaoPayloadBase = {
    valor: number;
    descricao: string;
    bancoId: number;
    formaPagamentoId: number;
    data: string;
};

export type TransacaoPayload =
    | (TransacaoPayloadBase & {
    tipoMovimentacao: "ENTRADA";
    categoriaId?: null;
})
    | (TransacaoPayloadBase & {
    tipoMovimentacao: "DESPESA";
    categoriaId: number;
});