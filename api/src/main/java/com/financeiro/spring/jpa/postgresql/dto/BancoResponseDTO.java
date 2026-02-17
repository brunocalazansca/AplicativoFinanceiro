package com.financeiro.spring.jpa.postgresql.dto;

import lombok.Getter;

import java.math.BigDecimal;

@Getter
public class BancoResponseDTO {
    private final Long id;
    private final String nome;
    private final String corHex;
    private final BigDecimal saldo;
    private final Long qtdTransacoes;

    public BancoResponseDTO(Long id, String nome, String corHex, BigDecimal saldo, Long qtdTransacoes) {
        this.id = id;
        this.nome = nome;
        this.corHex = corHex;
        this.saldo = saldo;
        this.qtdTransacoes = qtdTransacoes;
    }

}
