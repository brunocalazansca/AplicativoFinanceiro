package com.financeiro.spring.jpa.postgresql.dto;

import lombok.*;
import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
public class ResumoDTO {
    private BigDecimal saldoTotal;
    private BigDecimal entradas;
    private BigDecimal despesas;
}
