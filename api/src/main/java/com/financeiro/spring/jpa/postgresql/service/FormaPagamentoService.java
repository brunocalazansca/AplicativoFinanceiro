package com.financeiro.spring.jpa.postgresql.service;

import com.financeiro.spring.jpa.postgresql.dto.FormaPagamentoDTO;
import com.financeiro.spring.jpa.postgresql.model.FormaPagamento;
import com.financeiro.spring.jpa.postgresql.repository.FormaPagamentoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FormaPagamentoService {
    private final FormaPagamentoRepository repository;

    public List<FormaPagamentoDTO> listarTodas() {
        return repository.findAll().stream()
            .map(forma -> FormaPagamentoDTO.builder()
                .id(forma.getId())
                .nome(forma.getNome())
                .corHex(forma.getCorHex())
                .build())
            .collect(Collectors.toList());
    }

    public FormaPagamentoDTO criar(FormaPagamentoDTO dto) {
        FormaPagamento forma = new FormaPagamento();
        forma.setNome(dto.getNome());
        forma.setCorHex(dto.getCorHex());
        FormaPagamento salvo = repository.save(forma);
        return FormaPagamentoDTO.builder()
            .id(salvo.getId())
            .nome(salvo.getNome())
            .corHex(salvo.getCorHex())
            .build();
    }
}
