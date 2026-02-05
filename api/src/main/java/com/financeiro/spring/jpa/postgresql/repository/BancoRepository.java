package com.financeiro.spring.jpa.postgresql.repository;

import com.financeiro.spring.jpa.postgresql.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import com.financeiro.spring.jpa.postgresql.model.Banco;

import java.util.List;

public interface BancoRepository extends JpaRepository<Banco, Long> {
    List<Banco> findByUserOrderByNomeAsc(User user);
    boolean existsByUserAndNomeIgnoreCase(User user, String nome);
}
