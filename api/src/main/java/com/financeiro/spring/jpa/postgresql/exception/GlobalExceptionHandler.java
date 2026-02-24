package com.financeiro.spring.jpa.postgresql.exception;

import com.financeiro.spring.jpa.postgresql.dto.ErrorResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ErrorResponseDTO> handleApiException(ApiException ex) {
        ErrorResponseDTO body = ErrorResponseDTO.builder()
                .status(HttpStatus.BAD_REQUEST.value())
                .error("Bad Request")
                .message("Ocorreu um erro interno.")
                .path("/api/bancos/1")
                .build();
        return ResponseEntity.status(ex.getStatus()).body(body);
    }
}
