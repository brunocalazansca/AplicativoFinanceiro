package com.financeiro.spring.jpa.postgresql.dto;

import lombok.*;

@Setter
@Getter
public class AuthResponseDTO {
    private String token;
    private String tokenType;
    private UserResponseDTO user;

    public AuthResponseDTO(String token, String tokenType, UserResponseDTO user) {
        this.token = token;
        this.tokenType = tokenType;
        this.user = user;
    }

}
