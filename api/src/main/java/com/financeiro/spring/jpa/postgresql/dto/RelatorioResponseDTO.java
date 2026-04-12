package com.financeiro.spring.jpa.postgresql.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class RelatorioResponseDTO {
    private String periodoLabel;
    private BigDecimal balanco;
    private BigDecimal totalEntradas;
    private BigDecimal totalDespesas;
    private List<DespesaPorCategoriaDTO> despesasPorCategoria;
    private List<DespesaPorBancoDTO> despesasPorBanco;
}
