package com.financeiro.spring.jpa.postgresql.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter

@Entity
@Table(
    name = "banco",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"usuario_id", "nome"})
    }
)

public class Banco {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 120)
    private String nome;

    @Column(name="cor_hex", nullable = false, length = 7)
    private String corHex;

    @Column(nullable = false, precision = 18, scale = 2)
    private BigDecimal saldo = BigDecimal.ZERO;

    @Column(name="created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name="updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Column(name = "qtd_transacoes", nullable = false)
    private Long qtdTransacoes = 0L;

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (saldo == null) saldo = BigDecimal.ZERO;
    }

    @PreUpdate
    public void preUpdate() {
        updatedAt = LocalDateTime.now();
        if (saldo == null) saldo = BigDecimal.ZERO;
    }
}
