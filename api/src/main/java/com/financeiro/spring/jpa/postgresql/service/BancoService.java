package com.financeiro.spring.jpa.postgresql.service;

import com.financeiro.spring.jpa.postgresql.dto.BancoCreateRequestDTO;
import com.financeiro.spring.jpa.postgresql.dto.BancoResponseDTO;
import com.financeiro.spring.jpa.postgresql.exception.ApiException;
import com.financeiro.spring.jpa.postgresql.model.Banco;
import com.financeiro.spring.jpa.postgresql.model.User;
import com.financeiro.spring.jpa.postgresql.repository.BancoRepository;
import com.financeiro.spring.jpa.postgresql.repository.UsersRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BancoService {
    private final BancoRepository bancoRepository;
    private final UsersRepository usersRepository;

    public BancoService(BancoRepository repo, UsersRepository usersRepository) {
        this.bancoRepository = repo;
        this.usersRepository = usersRepository;
    }

    public BancoResponseDTO criarBanco(User usuario, BancoCreateRequestDTO req) {

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
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Banco não encontrado", "id-banco"));

        String nomeBanco = banco.getNome();
        bancoRepository.delete(banco);

        return nomeBanco;
    }
}
