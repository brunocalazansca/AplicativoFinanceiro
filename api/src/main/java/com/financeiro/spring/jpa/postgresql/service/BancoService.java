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

    // TODO: Remover esse método daqui depois.
    private User getUsuarioLogado() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return (User) auth.getPrincipal();
    }

    public String deletarBanco(Long idBanco) {
        User usuario = usersRepository.findById(getUsuarioLogado().getId()).orElse(null);
        usuario.getBancos().size();

        String nomeBanco = usuario.getBancos()
                .stream()
                .filter(b -> b.getId().equals(idBanco))
                .map(Banco::getNome)
                .findFirst()
                .orElse(null);

        usuario.getBancos().removeIf(b -> b.getId().equals(idBanco));

        usersRepository.save(usuario);

        return nomeBanco;
    }
}
