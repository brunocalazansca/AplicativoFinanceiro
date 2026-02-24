package com.financeiro.spring.jpa.postgresql.controller;

import com.financeiro.spring.jpa.postgresql.dto.ResumoDTO;
import com.financeiro.spring.jpa.postgresql.dto.TransacaoCreateRequestDTO;
import com.financeiro.spring.jpa.postgresql.dto.TransacaoResponseDTO;
import com.financeiro.spring.jpa.postgresql.model.User;
import com.financeiro.spring.jpa.postgresql.repository.UsersRepository;
import com.financeiro.spring.jpa.postgresql.service.TransacaoService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/transacao")
@RequiredArgsConstructor
public class TransacaoController {

    private final TransacaoService transacaoService;
    private final UsersRepository userRepository;

    @PostMapping
    public ResponseEntity<TransacaoResponseDTO> cadastrarTransacao (
        @Valid @RequestBody
        TransacaoCreateRequestDTO dto
    ) {
        User usuarioLogado = getUsuarioLogado();

        TransacaoResponseDTO response = transacaoService.cadastrarTransacao(usuarioLogado, dto);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping(params = "id-banco")
    public ResponseEntity<List<TransacaoResponseDTO>> listarTrancoes(
            @AuthenticationPrincipal User usuarioLogado,
            @RequestParam("id-banco") Long idBanco
    ) {
        List<TransacaoResponseDTO> response = transacaoService.listarTransacoesPorBanco(usuarioLogado, idBanco);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<TransacaoResponseDTO>> listarTodasTransacoesPorUsuario() {
        User usuarioLogado = getUsuarioLogado();
        List<TransacaoResponseDTO> transacoes = transacaoService.listarTransacoesPorUsuario(usuarioLogado);

        return ResponseEntity.ok(transacoes);
    }

    @DeleteMapping(params = "id-transacao")
    public ResponseEntity<Map<String, Object>> deletarTransacao(
            @AuthenticationPrincipal User usuarioLogado,
            @RequestParam("id-transacao") Long idTransacao
    ) {

        String descricao = transacaoService.deletarTransacao(usuarioLogado, idTransacao);

        return ResponseEntity.ok(Map.of("descricao", descricao));
    }

    @GetMapping("/resumo")
    public ResponseEntity<ResumoDTO> obterResumo() {

        User usuarioLogado = getUsuarioLogado();

        ResumoDTO resumo = transacaoService.obterResumoTransacoes(usuarioLogado.getId());

        return ResponseEntity.ok(resumo);
    }

    private User getUsuarioLogado() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return (User) auth.getPrincipal();
    }
}
