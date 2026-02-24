package com.financeiro.spring.jpa.postgresql.service;

import com.financeiro.spring.jpa.postgresql.Enum.TipoMovimentacao;
import com.financeiro.spring.jpa.postgresql.dto.ResumoDTO;
import com.financeiro.spring.jpa.postgresql.dto.TransacaoCreateRequestDTO;
import com.financeiro.spring.jpa.postgresql.dto.TransacaoResponseDTO;
import com.financeiro.spring.jpa.postgresql.exception.ApiException; // <-- Importado
import com.financeiro.spring.jpa.postgresql.model.Banco;
import com.financeiro.spring.jpa.postgresql.model.Categoria;
import com.financeiro.spring.jpa.postgresql.model.Transacao;
import com.financeiro.spring.jpa.postgresql.model.User;
import com.financeiro.spring.jpa.postgresql.repository.BancoRepository;
import com.financeiro.spring.jpa.postgresql.repository.CategoriaRepository;
import com.financeiro.spring.jpa.postgresql.repository.TransacaoRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus; // <-- Importado
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
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

        if (dto.getValor() == null || dto.getValor().compareTo(BigDecimal.ZERO) <= 0) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "O valor da transação deve ser maior que zero.", "valor");
        }
        if (dto.getDescricao() == null || dto.getDescricao().trim().isEmpty()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "A descrição da transação é obrigatória.", "descricao");
        }
        if (dto.getData() == null) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "A data da transação é obrigatória.", "data");
        }
        if (dto.getTipoMovimentacao() == null) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "O tipo de movimentação (ENTRADA ou DESPESA) é obrigatório.", "tipoMovimentacao");
        }
        if (dto.getBancoId() == null) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "O banco de origem/destino é obrigatório.", "bancoId");
        }

        Banco banco = bancoRepository.findByIdAndUser(dto.getBancoId(), usuario)
                .orElseThrow(() -> new ApiException(
                        HttpStatus.NOT_FOUND,
                        "Banco não encontrado ou você não tem permissão para acessá-lo.",
                        "bancoId"
                ));

        Categoria categoria = null;
        if (dto.getCategoriaId() != null) {
            categoria = categoriaRepository.findByIdAndUser(dto.getCategoriaId(), usuario)
                    .orElseThrow(() -> new ApiException(
                            HttpStatus.NOT_FOUND,
                            "Categoria não encontrada ou você não tem permissão para acessá-la.",
                            "categoriaId"
                    ));
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
                transacao.getData(),
                transacao.getBanco().getId()
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
                        transacao.getData(),
                        transacao.getBanco().getId()
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
                        transacao.getData(),
                        transacao.getBanco().getId()
                ))
                .toList();
    }

    @Transactional
    public String deletarTransacao(User usuario, Long idTransacao) {
        Transacao transacao = transacaoRepository.findByIdAndUser(idTransacao, usuario)
            .orElseThrow(() -> new ApiException(
                HttpStatus.NOT_FOUND,
                "Transação não encontrada ou você não tem permissão para excluí-la.",
                "idTransacao"
            ));

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

    public ResumoDTO obterResumoTransacoes(Long usuarioId) {

        List<Transacao> transacoes = transacaoRepository.findByUserId(usuarioId);

        if (transacoes.isEmpty()) {
            return new ResumoDTO(BigDecimal.ZERO, BigDecimal.ZERO, BigDecimal.ZERO);
        }

        BigDecimal totalEntradas = transacoes.stream()
            .filter(t -> t.getTipoMovimentacao() == TipoMovimentacao.ENTRADA)
            .map(Transacao::getValor)
            .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalDespesas = transacoes.stream()
            .filter(t -> t.getTipoMovimentacao() == TipoMovimentacao.DESPESA)
            .map(Transacao::getValor)
            .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal saldoTotal = totalEntradas.subtract(totalDespesas);

        return new ResumoDTO(saldoTotal, totalEntradas, totalDespesas);
    }
}