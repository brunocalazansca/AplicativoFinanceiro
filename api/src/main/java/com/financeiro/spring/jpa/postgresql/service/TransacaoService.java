package com.financeiro.spring.jpa.postgresql.service;

import com.financeiro.spring.jpa.postgresql.Enum.TipoMovimentacao;
import com.financeiro.spring.jpa.postgresql.dto.TransacaoCreateRequestDTO;
import com.financeiro.spring.jpa.postgresql.dto.TransacaoResponseDTO;
import com.financeiro.spring.jpa.postgresql.model.Banco;
import com.financeiro.spring.jpa.postgresql.model.Categoria;
import com.financeiro.spring.jpa.postgresql.model.Transacao;
import com.financeiro.spring.jpa.postgresql.model.User;
import com.financeiro.spring.jpa.postgresql.repository.BancoRepository;
import com.financeiro.spring.jpa.postgresql.repository.CategoriaRepository;
import com.financeiro.spring.jpa.postgresql.repository.TransacaoRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransacaoService {
    private final TransacaoRepository transacaoRepository;
    private final BancoRepository bancoRepository;
    private final CategoriaRepository categoriaRepository;

    public TransacaoService(
            TransacaoRepository transacaoRepository,
            BancoRepository bancoRepository,
            CategoriaRepository categoriaRepository
    ) {
        this.transacaoRepository = transacaoRepository;
        this.bancoRepository = bancoRepository;
        this.categoriaRepository = categoriaRepository;
    }

    @Transactional
    public TransacaoResponseDTO cadastrarTransacao(User usuario, TransacaoCreateRequestDTO dto) {
        Banco banco = bancoRepository.findByIdAndUser(dto.getBancoId(), usuario)
                .orElseThrow(() -> new RuntimeException("Banco não encontrado ou não pertence ao usuário."));

        Categoria categoria = null;
        if (dto.getCategoriaId() != null) {
            categoria = categoriaRepository.findByIdAndUser(dto.getCategoriaId(), usuario)
                    .orElseThrow(() -> new RuntimeException("Categoria não encontrada ou não pertence ao usuário."));
        }

        if (dto.getTipoMovimentacao() == TipoMovimentacao.ENTRADA) {
            banco.setSaldo(banco.getSaldo().add(dto.getValor()));
        } else {
            banco.setSaldo(banco.getSaldo().subtract(dto.getValor()));
        }
        banco.setQtdTransacoes(banco.getQtdTransacoes() + 1);
        bancoRepository.save(banco);

        Transacao transacao = Transacao.builder()
                .tipoMovimentacao(dto.getTipoMovimentacao())
                .valor(dto.getValor())
                .descricao(dto.getDescricao())
                .data(dto.getData())
                .banco(banco)
                .categoria(categoria)
                .user(usuario)
                .build();

        transacao = transacaoRepository.save(transacao);

        return new TransacaoResponseDTO(
                transacao.getId(),
                transacao.getDescricao(),
                transacao.getTipoMovimentacao().name(),
                transacao.getValor(),
                transacao.getData()
        );
    }

    public List<TransacaoResponseDTO> listarTransacoesPorBanco(User usuario, Long bancoId) {
        List<Transacao> transacoes = transacaoRepository.findByBancoIdAndUserOrderByDataDesc(bancoId, usuario);

        return transacoes.stream()
            .map(transacao -> new TransacaoResponseDTO(
                transacao.getId(),
                transacao.getDescricao(),
                transacao.getTipoMovimentacao().name(),
                transacao.getValor(),
                transacao.getData()
            ))
            .toList();
    }

    public List<TransacaoResponseDTO> listarTransacoesPorUsuario(User usuario) {
        List<Transacao> transacoes = transacaoRepository.findByUserOrderByDataDesc(usuario);

        return transacoes.stream()
            .map(transacao -> new TransacaoResponseDTO(
                transacao.getId(),
                transacao.getDescricao(),
                transacao.getTipoMovimentacao().name(),
                transacao.getValor(),
                transacao.getData()
            ))
            .toList();
    }

    @Transactional
    public String deletarTransacao(User usuario, Long idTransacao) {

        Transacao transacao = transacaoRepository.findByIdAndUser(idTransacao, usuario)
                .orElseThrow(() -> new RuntimeException("Transação não encontrada ou acesso negado."));

        String descricaoDeletada = transacao.getDescricao();

        Banco banco = transacao.getBanco();

        if (transacao.getTipoMovimentacao() == TipoMovimentacao.ENTRADA) {
            banco.setSaldo(banco.getSaldo().subtract(transacao.getValor()));
        } else {
            banco.setSaldo(banco.getSaldo().add(transacao.getValor()));
        }

        banco.setQtdTransacoes(banco.getQtdTransacoes() - 1);

        bancoRepository.save(banco);

        transacaoRepository.delete(transacao);

        return descricaoDeletada;
    }
}
