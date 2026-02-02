package com.financeiro.spring.jpa.postgresql.security;

public interface TokenProvider {
    String generateToken(Long userId, String email);
    boolean isTokenValid(String token);
    String getEmailFromToken(String token);
}
