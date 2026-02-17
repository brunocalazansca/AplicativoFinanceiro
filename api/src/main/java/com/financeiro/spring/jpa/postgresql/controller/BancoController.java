package com.financeiro.spring.jpa.postgresql.controller;

import com.financeiro.spring.jpa.postgresql.dto.BancoCreateRequestDTO;
import com.financeiro.spring.jpa.postgresql.dto.BancoResponseDTO;
import com.financeiro.spring.jpa.postgresql.model.User;
import com.financeiro.spring.jpa.postgresql.service.BancoService;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bancos")
public class BancoController {

    private final BancoService service;

    public BancoController(BancoService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<BancoResponseDTO> criarBanco(@Valid @RequestBody BancoCreateRequestDTO req) {
        User usuarioLogado = getUsuarioLogado();
        BancoResponseDTO res = service.criarBanco(usuarioLogado, req);
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @GetMapping
    public ResponseEntity<List<BancoResponseDTO>> listarBanco() {
        User usuarioLogado = getUsuarioLogado();
        return ResponseEntity.ok(service.listarBanco(usuarioLogado));
    }

    @DeleteMapping
    public ResponseEntity<Map<String, Object>> deletarBanco(
            @AuthenticationPrincipal User usuarioLogado,
            @RequestParam("id-banco") Long idBanco
    ) {
        String nomeBanco = service.deletarBanco(usuarioLogado, idBanco);
        return ResponseEntity.ok(Map.of("nome", nomeBanco));
    }

    private User getUsuarioLogado() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return (User) auth.getPrincipal();
    }
}
