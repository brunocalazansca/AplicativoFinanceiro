package com.financeiro.spring.jpa.postgresql.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(
    name = "categorias",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"usuario_id", "nome"})
    }
)
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(name = "cor_hex", length = 7)
    private String corHex;
}
