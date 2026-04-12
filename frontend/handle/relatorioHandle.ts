import { useState, useCallback } from "react";
import { RelatorioApi } from "@/_utils/typeRelatorioApi";
import { PeriodOption } from "@/_utils/typePeriodOptions";
import { PERIOD_TO_FILTRO } from "@/_utils/relatorioConstants";
import { obterRelatorio } from "@/services/relatorioService";

export function useHandleRelatorio() {
    const [period, setPeriod] = useState<PeriodOption>("Este mês");
    const [menuOpen, setMenuOpen] = useState(false);
    const [relatorio, setRelatorio] = useState<RelatorioApi | null>(null);
    const [loading, setLoading] = useState(true);
    const [customStartDate, setCustomStartDate] = useState<Date | null>(null);
    const [customEndDate, setCustomEndDate] = useState<Date | null>(null);

    const fetchRelatorio = useCallback(async () => {
        const filtro = PERIOD_TO_FILTRO[period] ?? "MES_ATUAL";

        if (filtro === "RANGE" && (!customStartDate || !customEndDate)) {
            setRelatorio(null);
            return;
        }

        setLoading(true);
        try {
            const params: any = { filtro };
            if (filtro === "RANGE") {
                params.dataInicio = customStartDate!.toISOString().split('T')[0];
                params.dataFim = customEndDate!.toISOString().split('T')[0];
            }
            const data = await obterRelatorio(params);
            setRelatorio(data);
        } catch (err) {
            console.error("Erro ao buscar relatório:", err);
        } finally {
            setLoading(false);
        }
    }, [period, customStartDate, customEndDate]);

    const balanco = relatorio?.balanco ?? 0;
    const totalEntradas = relatorio?.totalEntradas ?? 0;
    const totalDespesas = relatorio?.totalDespesas ?? 0;
    const periodoLabel = relatorio?.periodoLabel ?? "";
    const despesasPorCategoria = relatorio?.despesasPorCategoria ?? [];
    const despesasPorBanco = relatorio?.despesasPorBanco ?? [];

    const balancoColor = balanco >= 0 ? "#16A34A" : "#EF4444";

    return {
        period,
        setPeriod,
        menuOpen,
        setMenuOpen,
        relatorio,
        loading,
        customStartDate,
        setCustomStartDate,
        customEndDate,
        setCustomEndDate,
        fetchRelatorio,
        balanco,
        totalEntradas,
        totalDespesas,
        periodoLabel,
        despesasPorCategoria,
        despesasPorBanco,
        balancoColor
    };
}
