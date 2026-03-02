package com.financeiro.spring.jpa.postgresql.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "forma_pagamento")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FormaPagamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String nome;

    @OneToMany(mappedBy = "formaPagamento")
    private List<Transacao> transacoes;
}
