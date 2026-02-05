package com.financeiro.spring.jpa.postgresql.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @Column(name = "nome", nullable = false)
  private String nome;

  @Column(name = "email", nullable = false, unique = true)
  private String email;

  @Column(name = "senha", nullable = false)
  private String senha;

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  private Set<Banco> bancos = new HashSet<>();
}
