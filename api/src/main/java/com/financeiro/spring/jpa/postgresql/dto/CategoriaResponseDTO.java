package com.financeiro.spring.jpa.postgresql.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CategoriaResponseDTO {
    @NotBlank
    private Long id;

    @NotBlank
    private String nome;

    @NotBlank
    @Pattern(regexp = "^#[0-9A-Fa-f]{6}$", message = "A cor deve estar no formato #RRGGBB")
    private String corHex;

    public CategoriaResponseDTO(Long id, String nome, String corHex) {
        this.id = id;
        this.nome = nome;
        this.corHex = corHex;
    }
}
