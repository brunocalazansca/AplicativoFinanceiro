package com.financeiro.spring.jpa.postgresql.repository;

import com.financeiro.spring.jpa.postgresql.model.FormaPagamento;
import com.financeiro.spring.jpa.postgresql.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FormaPagamentoRepository extends JpaRepository<FormaPagamento, Long> {

    @Query("SELECT f FROM FormaPagamento f WHERE f.user = :user OR f.user IS NULL ORDER BY CASE WHEN f.user IS NULL THEN 1 ELSE 0 END ASC, f.nome ASC")
    List<FormaPagamento> findByUserOrGlobal(@Param("user") User user);

    Optional<FormaPagamento> findByIdAndUser(Long id, User user);

    boolean existsByUserAndNomeIgnoreCase(User user, String nome);
}
