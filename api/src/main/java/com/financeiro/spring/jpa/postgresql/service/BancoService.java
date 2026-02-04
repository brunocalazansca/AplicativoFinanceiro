package com.financeiro.spring.jpa.postgresql.service;

import com.financeiro.spring.jpa.postgresql.dto.BancoCreateRequestDTO;
import com.financeiro.spring.jpa.postgresql.dto.BancoResponseDTO;
import com.financeiro.spring.jpa.postgresql.exception.ApiException;
import com.financeiro.spring.jpa.postgresql.model.Banco;
import com.financeiro.spring.jpa.postgresql.repository.BancoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BancoService {
    private final BancoRepository bancoRepository;

    public BancoService(BancoRepository repo) {
        this.bancoRepository = repo;
    }

    public BancoResponseDTO criar(Long usuarioId, BancoCreateRequestDTO req) {

        if (bancoRepository.existsByUsuarioIdAndNomeIgnoreCase(usuarioId, req.getNome())) {
            throw new ApiException(HttpStatus.CONFLICT, "Banco já cadastrado", "nome");
        }

        Banco b = new Banco();
        b.setUsuarioId(usuarioId);
        b.setNome(req.getNome());
        b.setCorHex(req.getCorHex());

        Banco salvo = bancoRepository.save(b);

        return new BancoResponseDTO(
                salvo.getId(), salvo.getNome(), salvo.getCorHex(), salvo.getSaldo(), salvo.getQtdTransacoes()
        );
    }

    public List<BancoResponseDTO> listar(Long usuarioId) {
        return bancoRepository.findByUsuarioIdOrderByNomeAsc(usuarioId).stream()
                .map(b -> new BancoResponseDTO(b.getId(), b.getNome(), b.getCorHex(), b.getSaldo(), b.getQtdTransacoes()))
                .toList();
    }
}
