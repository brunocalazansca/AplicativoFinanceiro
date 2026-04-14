package com.financeiro.spring.jpa.postgresql.controller;

import com.financeiro.spring.jpa.postgresql.dto.FormaPagamentoDTO;
import com.financeiro.spring.jpa.postgresql.service.FormaPagamentoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/forma-pagamento")
@RequiredArgsConstructor
public class FormaPagamentoController {
    private final FormaPagamentoService service;

    @GetMapping
    public ResponseEntity<List<FormaPagamentoDTO>> listarTodasFormasPagamento() {
        return ResponseEntity.ok(service.listarTodas());
    }

    @PostMapping
    public ResponseEntity<FormaPagamentoDTO> criar(@RequestBody FormaPagamentoDTO dto) {
        return ResponseEntity.ok(service.criar(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<FormaPagamentoDTO> atualizar(@PathVariable Long id, @RequestBody FormaPagamentoDTO dto) {
        return ResponseEntity.ok(service.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
