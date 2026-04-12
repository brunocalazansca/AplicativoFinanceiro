package com.financeiro.spring.jpa.postgresql.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@AllArgsConstructor
public class DespesaPorBancoDTO {
    private Long bancoId;
    private String bancoNome;
    private String corHex;
    private BigDecimal total;
}
