package com.financeiro.spring.jpa.postgresql.dto;

public class ErrorResponseDTO {
    private int status;
    private String error;
    private String field;

    public ErrorResponseDTO() {}

    public ErrorResponseDTO(int status, String error, String field) {
        this.status = status;
        this.error = error;
        this.field = field;
    }

    public int getStatus() { return status; }
    public void setStatus(int status) { this.status = status; }

    public String getError() { return error; }
    public void setError(String error) { this.error = error; }

    public String getField() { return field; }
    public void setField(String field) { this.field = field; }
}

