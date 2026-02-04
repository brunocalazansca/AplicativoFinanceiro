package com.financeiro.spring.jpa.postgresql.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.financeiro.spring.jpa.postgresql.model.Banco;

import java.util.List;

public interface BancoRepository extends JpaRepository<Banco, Long> {
    public List<Banco> findByUsuarioIdOrderByNomeAsc(Long usuarioId);
    public boolean existsByUsuarioIdAndNomeIgnoreCase(Long usuarioId, String nome);
}
