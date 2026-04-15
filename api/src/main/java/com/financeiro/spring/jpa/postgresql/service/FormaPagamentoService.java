package com.financeiro.spring.jpa.postgresql.service;

import com.financeiro.spring.jpa.postgresql.dto.FormaPagamentoDTO;
import com.financeiro.spring.jpa.postgresql.exception.ApiException;
import com.financeiro.spring.jpa.postgresql.model.FormaPagamento;
import com.financeiro.spring.jpa.postgresql.model.User;
import com.financeiro.spring.jpa.postgresql.repository.FormaPagamentoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FormaPagamentoService {
    private final FormaPagamentoRepository repository;

    private FormaPagamentoDTO toDTO(FormaPagamento f) {
        return FormaPagamentoDTO.builder()
            .id(f.getId())
            .usuarioId(f.getUser() != null ? f.getUser().getId() : null)
            .nome(f.getNome())
            .corHex(f.getCorHex())
            .build();
    }

    public List<FormaPagamentoDTO> listarTodas(User user) {
        return repository.findByUserOrGlobal(user).stream()
            .map(this::toDTO)
            .collect(Collectors.toList());
    }

    public FormaPagamentoDTO criar(User user, FormaPagamentoDTO dto) {
        if (repository.existsByUserAndNomeIgnoreCase(user, dto.getNome())) {
            throw new ApiException(HttpStatus.CONFLICT, "Forma de pagamento já cadastrada.", "nome");
        }
        FormaPagamento forma = new FormaPagamento();
        forma.setUser(user);
        forma.setNome(dto.getNome());
        forma.setCorHex(dto.getCorHex());
        return toDTO(repository.save(forma));
    }

    public FormaPagamentoDTO atualizar(User user, Long id, FormaPagamentoDTO dto) {
        FormaPagamento forma = repository.findByIdAndUser(id, user)
            .orElseThrow(() -> new ApiException(HttpStatus.FORBIDDEN, "Você não tem permissão para editar esta forma de pagamento.", "id"));
        forma.setNome(dto.getNome());
        return toDTO(repository.save(forma));
    }

    public void deletar(User user, Long id) {
        FormaPagamento forma = repository.findByIdAndUser(id, user)
            .orElseThrow(() -> new ApiException(HttpStatus.FORBIDDEN, "Você não tem permissão para excluir esta forma de pagamento.", "id"));
        repository.delete(forma);
    }
}
