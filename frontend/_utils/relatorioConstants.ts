import { RelatorioFiltro } from "./typeRelatorioApi";
import { PeriodOption } from "./typePeriodOptions";

export const PERIOD_TO_FILTRO: Record<string, RelatorioFiltro> = {
    "Este mês": "MES_ATUAL",
    "Últimos 30 dias": "ULTIMOS_30_DIAS",
    "Este ano": "ESTE_ANO",
    "Personalizado": "RANGE",
};

export const DROPDOWN_OPTIONS: PeriodOption[] = [
    "Este mês",
    "Últimos 30 dias",
    "Este ano",
    "Personalizado",
];
