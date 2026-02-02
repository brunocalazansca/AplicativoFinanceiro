package com.financeiro.spring.jpa.postgresql.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class LoginRequestDTO {
    @NotBlank(message = "Campo email é obrigatório.")
    @Email(message = "email inválido")
    private String email;

    @NotBlank(message = "Campo senha é obrigatória.")
    private String senha;

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }
}
