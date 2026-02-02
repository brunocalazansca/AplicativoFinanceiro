package com.financeiro.spring.jpa.postgresql.exception;

import com.financeiro.spring.jpa.postgresql.dto.ErrorResponseDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ErrorResponseDTO> handleApiException(ApiException ex) {
        ErrorResponseDTO body = new ErrorResponseDTO(
                ex.getStatus().value(),
                ex.getMessage(),
                ex.getField()
        );
        return ResponseEntity.status(ex.getStatus()).body(body);
    }
}
