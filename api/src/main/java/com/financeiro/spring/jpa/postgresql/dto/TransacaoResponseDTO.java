package com.financeiro.spring.jpa.postgresql.dto;

import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
public class TransacaoResponseDTO {
    private final Long id;
    private final String descricao;
    private final String tipoMovimentacao;
    private final BigDecimal valor;
    private final LocalDate data;
    private final Long bancoId;

    public TransacaoResponseDTO(Long id, String descricao, String tipoMovimentacao, BigDecimal valor, LocalDate data, Long bancoId) {
        this.id = id;
        this.descricao = descricao;
        this.tipoMovimentacao = tipoMovimentacao;
        this.valor = valor;
        this.data = data;
        this.bancoId = bancoId;
    }
}
