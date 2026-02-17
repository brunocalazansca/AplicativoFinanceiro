package com.financeiro.spring.jpa.postgresql.repository;

import com.financeiro.spring.jpa.postgresql.model.Categoria;
import com.financeiro.spring.jpa.postgresql.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    List<Categoria> findByUser(User user);
    Optional<Categoria> findByIdAndUser(Long id, User user);
    boolean existsByUserAndNomeIgnoreCase(User user, String nome);
}
