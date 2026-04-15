package com.financeiro.spring.jpa.postgresql.controller;

import com.financeiro.spring.jpa.postgresql.dto.FormaPagamentoDTO;
import com.financeiro.spring.jpa.postgresql.model.User;
import com.financeiro.spring.jpa.postgresql.service.FormaPagamentoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/forma-pagamento")
@RequiredArgsConstructor
public class FormaPagamentoController {
    private final FormaPagamentoService service;

    @GetMapping
    public ResponseEntity<List<FormaPagamentoDTO>> listarTodasFormasPagamento() {
        return ResponseEntity.ok(service.listarTodas(getUsuarioLogado()));
    }

    @PostMapping
    public ResponseEntity<FormaPagamentoDTO> criar(@RequestBody FormaPagamentoDTO dto) {
        return ResponseEntity.ok(service.criar(getUsuarioLogado(), dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<FormaPagamentoDTO> atualizar(@PathVariable Long id, @RequestBody FormaPagamentoDTO dto) {
        return ResponseEntity.ok(service.atualizar(getUsuarioLogado(), id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(getUsuarioLogado(), id);
        return ResponseEntity.noContent().build();
    }

    private User getUsuarioLogado() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return (User) auth.getPrincipal();
    }
}
