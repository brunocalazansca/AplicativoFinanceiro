package com.financeiro.spring.jpa.postgresql.repository;

import com.financeiro.spring.jpa.postgresql.model.Transacao;
import com.financeiro.spring.jpa.postgresql.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TransacaoRepository extends JpaRepository<Transacao, Long> {
    Optional<Transacao> findByIdAndUser(Long id, User user);
    List<Transacao> findByUserOrderByDataDesc(User user);
    List<Transacao> findByBancoIdAndUserOrderByDataDesc(Long bancoId, User user);
    boolean existsByBancoId(Long bancoId);
    boolean existsByCategoriaId(Long categoriaId);
    List<Transacao> findByUserId(Long userId);
}
