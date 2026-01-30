import { TipoMovimentacao } from '@/_utils/typeTransaction';

export type Transaction = {
    id: string;
    type: TipoMovimentacao,
    descricao: string;
    // banco: string;
    valor: number;
    data: string;
};

export type Bank = {
    id: string;
    nome: string;
    cor: string;
    saldo: number;
    transacoes: Transaction[];
};

export const BANKS: Bank[] = [
    {
        id: "bb",
        nome: "Banco do Brasil",
        cor: "#F59E0B",
        saldo: 1430,
        transacoes: [
            {
                id: "t1",
                type: "Entrada",
                descricao: "Salário",
                valor: 1430,
                data: "2026-01-10",
            },
        ],
    },
    {
        id: "nubank",
        nome: "Nubank",
        cor: "#8B5CF6",
        saldo: 900,
        transacoes: [
            {
                id: "t2",
                type: "Entrada",
                descricao: "INSS",
                valor: 1000,
                data: "2026-01-19",
            },
            {
                id: "t3",
                type: "Despesa",
                descricao: "Mercado",
                valor: 100,
                data: "2026-01-20",
            },
        ],
    },
];
