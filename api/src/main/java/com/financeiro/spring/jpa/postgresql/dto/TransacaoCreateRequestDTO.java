package com.financeiro.spring.jpa.postgresql.dto;

import com.financeiro.spring.jpa.postgresql.Enum.TipoMovimentacao;

import jakarta.validation.constraints.*;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
public class TransacaoCreateRequestDTO {
    @NotNull(message = "O tipo de movimentação é obrigatório")
    private TipoMovimentacao tipoMovimentacao;

    @NotNull(message = "O valor é obrigatório")
    @Positive(message = "O valor deve ser maior que zero")
    private BigDecimal valor;

    @NotBlank(message = "A descrição é obrigatória")
    private String descricao;

    @NotNull(message = "O banco é obrigatório")
    private Long bancoId;

    private Long categoriaId;

    @NotNull(message = "A data é obrigatória")
    private LocalDate data;
}
