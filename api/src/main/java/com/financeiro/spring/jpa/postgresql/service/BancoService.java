package com.financeiro.spring.jpa.postgresql.service;

import com.financeiro.spring.jpa.postgresql.dto.BancoCreateRequestDTO;
import com.financeiro.spring.jpa.postgresql.dto.BancoResponseDTO;
import com.financeiro.spring.jpa.postgresql.exception.ApiException;
import com.financeiro.spring.jpa.postgresql.model.Banco;
import com.financeiro.spring.jpa.postgresql.model.User;
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

    public BancoResponseDTO criar(User usuario, BancoCreateRequestDTO req) {

        if (bancoRepository.existsByUserAndNomeIgnoreCase(usuario, req.getNome())) {
            throw new ApiException(HttpStatus.CONFLICT, "Banco já cadastrado", "nome");
        }

        Banco b = new Banco();
        b.setUser(usuario);
        b.setNome(req.getNome());
        b.setCorHex(req.getCorHex());

        Banco salvo = bancoRepository.save(b);

        return new BancoResponseDTO(
                salvo.getId(), salvo.getNome(), salvo.getCorHex(), salvo.getSaldo(), salvo.getQtdTransacoes()
        );
    }

    public List<BancoResponseDTO> listar(User usuario) {
        return bancoRepository.findByUserOrderByNomeAsc(usuario).stream()
                .map(b -> new BancoResponseDTO(b.getId(), b.getNome(), b.getCorHex(), b.getSaldo(), b.getQtdTransacoes()))
                .toList();
    }

//    public void deletar(Long id, Long usuarioId) {
//        Banco b = bancoRepository.findByIdAndUsuarioId(id, usuarioId)
//                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Banco não encontrado", "id"));
//
//        bancoRepository.delete(b);
//    }
}
