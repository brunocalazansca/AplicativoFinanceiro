package com.financeiro.spring.jpa.postgresql.dto;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FormaPagamentoDTO {
    private Long id;
    private Long usuarioId;
    private String nome;
    private String corHex;
}
