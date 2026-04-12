package com.financeiro.spring.jpa.postgresql.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@AllArgsConstructor
public class DespesaPorCategoriaDTO {
    private Long categoriaId;
    private String categoriaNome;
    private String corHex;
    private BigDecimal total;
}
