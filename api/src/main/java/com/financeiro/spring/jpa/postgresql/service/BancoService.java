package com.financeiro.spring.jpa.postgresql.service;

import com.financeiro.spring.jpa.postgresql.dto.BancoCreateRequestDTO;
import com.financeiro.spring.jpa.postgresql.dto.BancoResponseDTO;
import com.financeiro.spring.jpa.postgresql.exception.ApiException;
import com.financeiro.spring.jpa.postgresql.model.Banco;
import com.financeiro.spring.jpa.postgresql.model.User;
import com.financeiro.spring.jpa.postgresql.repository.BancoRepository;
import com.financeiro.spring.jpa.postgresql.repository.TransacaoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BancoService {
    private final BancoRepository bancoRepository;
    private final TransacaoRepository transacaoRepository;

    public BancoService(BancoRepository repo, TransacaoRepository transacaoRepository) {
        this.bancoRepository = repo;
        this.transacaoRepository = transacaoRepository;
    }

    public BancoResponseDTO cadastrarBanco(User usuario, BancoCreateRequestDTO req) {
        if (req.getNome() == null || req.getNome().trim().isEmpty()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "O nome do banco é obrigatório.", "nome");
        }

        if (req.getCorHex() == null || req.getCorHex().trim().isEmpty()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "A cor de identificação é obrigatória.", "corHex");
        }

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

    public List<BancoResponseDTO> listarBanco(User usuario) {
        return bancoRepository.findByUserOrderByNomeAsc(usuario).stream()
            .map(b -> new BancoResponseDTO(b.getId(), b.getNome(), b.getCorHex(), b.getSaldo(), b.getQtdTransacoes()))
            .toList();
    }

    public String deletarBanco(User usuarioLogado, Long idBanco) {
        Banco banco = bancoRepository.findByIdAndUser(idBanco, usuarioLogado)
            .orElseThrow(()
            -> new ApiException(HttpStatus.NOT_FOUND, "Banco não encontrado ou você não tem permissão para acessá-lo.", "idBanco"));

        if (transacaoRepository.existsByBancoId(idBanco)) {
            throw new ApiException(
                HttpStatus.BAD_REQUEST,
                "Não foi possível excluir o banco '" + banco.getNome() + "' porque ele possui transações registradas.",
                "banco"
            );
        }

        String nomeBanco = banco.getNome();
        bancoRepository.delete(banco);

        return nomeBanco;
    }
}
