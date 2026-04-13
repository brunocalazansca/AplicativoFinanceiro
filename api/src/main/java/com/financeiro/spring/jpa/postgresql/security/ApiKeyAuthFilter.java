package com.financeiro.spring.jpa.postgresql.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class ApiKeyAuthFilter extends OncePerRequestFilter {

    @Value("${app.api.key}")
    private String expectedApiKey;

    @Value("${app.api.secret}")
    private String expectedApiSecret;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // Ignorar verificacao para pre-flight do CORS
        if (HttpMethod.OPTIONS.name().equals(request.getMethod())) {
            filterChain.doFilter(request, response);
            return;
        }

        String reqApiKey = request.getHeader("X-API-KEY");
        String reqApiSecret = request.getHeader("X-API-SECRET");

        if (expectedApiKey.equals(reqApiKey) && expectedApiSecret.equals(reqApiSecret)) {
            filterChain.doFilter(request, response);
        } else {
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write("{\"error\": \"Unauthorized\", \"message\": \"Chaves de API inválidas ou ausentes.\"}");
        }
    }
}
