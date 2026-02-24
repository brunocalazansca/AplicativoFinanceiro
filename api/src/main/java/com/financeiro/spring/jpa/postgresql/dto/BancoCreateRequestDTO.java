package com.financeiro.spring.jpa.postgresql.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Setter
@Getter
public class BancoCreateRequestDTO {
    @NotBlank
    private String nome;

    @NotBlank
    @Pattern(regexp = "^#[0-9A-Fa-f]{6}$", message = "A cor deve estar no formato #RRGGBB")
    private String corHex;
}
