package com.financeiro.spring.jpa.postgresql.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.financeiro.spring.jpa.postgresql.model.User;

public interface UsersRepository extends JpaRepository<User, Long> {
  Optional<User> findByEmail(String email);
  boolean existsByEmail(String email);
}
