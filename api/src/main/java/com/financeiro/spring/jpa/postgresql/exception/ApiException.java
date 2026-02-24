package com.financeiro.spring.jpa.postgresql.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ApiException extends RuntimeException {
    private final HttpStatus status;
    private final String field;

    public ApiException(HttpStatus status, String message, String field) {
        super(message);
        this.status = status;
        this.field = field;
    }

}
