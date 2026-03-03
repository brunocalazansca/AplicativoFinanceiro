package com.financeiro.spring.jpa.postgresql.repository;

import com.financeiro.spring.jpa.postgresql.model.FormaPagamento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FormaPagamentoRepository extends JpaRepository<FormaPagamento, Long> {
}
