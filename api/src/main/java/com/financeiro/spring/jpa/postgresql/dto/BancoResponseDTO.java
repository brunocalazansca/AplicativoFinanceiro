package com.financeiro.spring.jpa.postgresql.dto;

import java.math.BigDecimal;

public class BancoResponseDTO {
    private final Long id;
    private final String nome;
    private final String corHex;
    private final BigDecimal saldo;
    private Long qtdTransacoes;

    public BancoResponseDTO(Long id, String nome, String corHex, BigDecimal saldo, Long qtdTransacoes) {
        this.id = id;
        this.nome = nome;
        this.corHex = corHex;
        this.saldo = saldo;
        this.qtdTransacoes = qtdTransacoes;
    }

    public Long getId() { return id; }
    public String getNome() { return nome; }
    public String getCorHex() { return corHex; }
    public BigDecimal getSaldo() { return saldo; }
    public Long getQtdTransacoes() { return qtdTransacoes; }
}
