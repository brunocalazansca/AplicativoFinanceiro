package com.financeiro.spring.jpa.postgresql.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(
    name = "forma_pagamento",
    uniqueConstraints = @UniqueConstraint(columnNames = {"usuario_id", "nome"})
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FormaPagamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = true)
    private User user;

    @Column(nullable = false, length = 50)
    private String nome;

    @Column(name = "cor_hex", length = 7)
    private String corHex;

    @OneToMany(mappedBy = "formaPagamento")
    private List<Transacao> transacoes;
}
