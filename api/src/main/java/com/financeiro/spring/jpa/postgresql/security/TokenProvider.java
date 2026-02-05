package com.financeiro.spring.jpa.postgresql.security;

import com.financeiro.spring.jpa.postgresql.model.User;

public interface TokenProvider {
    String generateToken(User usuario, String email);
    boolean isTokenValid(String token);
    String getEmailFromToken(String token);
}
