package com.financeiro.spring.jpa.postgresql.controller;

import com.financeiro.spring.jpa.postgresql.dto.CategoriaCreateRequestDTO;
import com.financeiro.spring.jpa.postgresql.dto.CategoriaResponseDTO;
import com.financeiro.spring.jpa.postgresql.model.User;
import com.financeiro.spring.jpa.postgresql.service.CategoriaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {

    private final CategoriaService service;

    public CategoriaController(CategoriaService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<CategoriaResponseDTO> criarCategoria(@Valid @RequestBody CategoriaCreateRequestDTO req) {
        User usuarioLogado = getUsuarioLogado();
        CategoriaResponseDTO res = service.cadastrarCategoria(usuarioLogado, req);
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @GetMapping
    public ResponseEntity<?> listarCategorias() {
        User usuarioLogado = getUsuarioLogado();
        return ResponseEntity.ok(service.listarCategorias(usuarioLogado));
    }

    @DeleteMapping
    public ResponseEntity<Map<String, Object>> deletarCategoria(
            @AuthenticationPrincipal User usuarioLogado,
            @RequestParam("id-categoria") Long idCategoria
    ) {
        String nomeCategoria = service.deletarCategoria(usuarioLogado, idCategoria);
        return ResponseEntity.ok(Map.of("nome", nomeCategoria));
    }

    private User getUsuarioLogado() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return (User) auth.getPrincipal();
    }
}
