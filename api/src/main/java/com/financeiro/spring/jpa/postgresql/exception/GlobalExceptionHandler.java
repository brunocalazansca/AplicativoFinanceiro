package com.financeiro.spring.jpa.postgresql.exception;

import com.financeiro.spring.jpa.postgresql.dto.ErrorResponseDTO;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ErrorResponseDTO> handleApiException(ApiException ex, HttpServletRequest request) {
        ErrorResponseDTO body = ErrorResponseDTO.builder()
                .status(ex.getStatus().value())
                .error(ex.getStatus().getReasonPhrase())
                .message(ex.getMessage())
                .field(ex.getField())
                .path(request.getRequestURI())
                .build();
        return ResponseEntity.status(ex.getStatus()).body(body);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ErrorResponseDTO> handleValidationExceptions(MethodArgumentNotValidException ex, HttpServletRequest request) {
        FieldError fieldError = ex.getBindingResult().getFieldError();
        String message = fieldError != null ? fieldError.getDefaultMessage() : "Erro ao validar os dados.";
        String field = fieldError != null ? fieldError.getField() : null;

        ErrorResponseDTO body = ErrorResponseDTO.builder()
                .status(HttpStatus.BAD_REQUEST.value())
                .error(HttpStatus.BAD_REQUEST.getReasonPhrase())
                .message(message)
                .field(field)
                .path(request.getRequestURI())
                .build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ErrorResponseDTO> handleHttpMessageNotReadable(HttpMessageNotReadableException ex, HttpServletRequest request) {
        ErrorResponseDTO body = ErrorResponseDTO.builder()
                .status(HttpStatus.BAD_REQUEST.value())
                .error(HttpStatus.BAD_REQUEST.getReasonPhrase())
                .message("Erro ao enviar a requisição.")
                .path(request.getRequestURI())
                .build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
    }

    @ExceptionHandler(NoHandlerFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<ErrorResponseDTO> handleNoHandlerFoundException(NoHandlerFoundException ex, HttpServletRequest request) {
        ErrorResponseDTO body = ErrorResponseDTO.builder()
                .status(HttpStatus.NOT_FOUND.value())
                .error(HttpStatus.NOT_FOUND.getReasonPhrase())
                .message("Recurso não encontrado.")
                .path(request.getRequestURI())
                .build();
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(body);
    }

    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ResponseEntity<ErrorResponseDTO> handleAccessDeniedException(AccessDeniedException ex, HttpServletRequest request) {
        ErrorResponseDTO body = ErrorResponseDTO.builder()
                .status(HttpStatus.FORBIDDEN.value())
                .error(HttpStatus.FORBIDDEN.getReasonPhrase())
                .message("Você não tem permissão para acessar este recurso.")
                .path(request.getRequestURI())
                .build();
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(body);
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<ErrorResponseDTO> handleAllUncaughtException(Exception ex, HttpServletRequest request) {
        ErrorResponseDTO body = ErrorResponseDTO.builder()
                .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .error(HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase())
                .message("Ocorreu um erro interno no servidor, tente novamente mais tarde.")
                .path(request.getRequestURI())
                .build();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(body);
    }
}
