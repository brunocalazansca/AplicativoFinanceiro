import { TipoMovimentacao } from '@/_utils/typeTransaction'
import {Feather} from "@expo/vector-icons";

export type FeatherIconName = React.ComponentProps<typeof Feather>["name"];

export type HomeCard = {
    title: string;
    icon: FeatherIconName;
    valor: number;
    valorColor: string;
    color: string;
    borderColor: string;
    iconBackgroundColor: string;
    iconColor: string;
};

export type HomeTransaction = {
    id: string;
    type: TipoMovimentacao;
    descricao: string;
    banco: string;
    valor: number;
    data: string;
};

export const HOME_MOCK = {
    saldoTotal: 2330,
    cards: {
        entradas: {
            title: "Entradas",
            icon: "arrow-up",
            valor: 2430,
            valorColor: "#16A249",
            color: "#E8F6ED",
            borderColor: "#CDEFD6",
            iconBackgroundColor: "#B6DEC7",
            iconColor: "#0F9153",
        } as HomeCard,
        despesas: {
            title: "Despesas",
            icon: "arrow-down",
            valor: 100,
            valorColor: "#EF4343",
            color: "#FDEEEF",
            borderColor: "#F5C2C4",
            iconBackgroundColor: "#F7C9CB",
            iconColor: "#E05252",
        } as HomeCard,
    },
    recentes: [
        {
            id: "t1",
            type: "Entrada",
            descricao: "INSS",
            banco: "Nubank",
            valor: 2430,
            data: "2026-01-19",
        },
        {
            id: "t2",
            type: "Despesa",
            descricao: "Internet",
            banco: "Nubank",
            valor: 100,
            data: "2026-01-19",
        },
    ] as HomeTransaction[],
};
