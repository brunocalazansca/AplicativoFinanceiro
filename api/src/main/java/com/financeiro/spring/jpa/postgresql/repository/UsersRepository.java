package com.financeiro.spring.jpa.postgresql.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.financeiro.spring.jpa.postgresql.model.Users;

public interface UsersRepository extends JpaRepository<Users, Long> {
  Optional<Users> findByEmail(String email);
  boolean existsByEmail(String email);
}
