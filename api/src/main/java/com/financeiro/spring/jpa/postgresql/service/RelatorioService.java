package com.financeiro.spring.jpa.postgresql.service;

import com.financeiro.spring.jpa.postgresql.Enum.RelatorioFiltro;
import com.financeiro.spring.jpa.postgresql.Enum.TipoMovimentacao;
import com.financeiro.spring.jpa.postgresql.dto.DespesaPorBancoDTO;
import com.financeiro.spring.jpa.postgresql.dto.DespesaPorCategoriaDTO;
import com.financeiro.spring.jpa.postgresql.dto.RelatorioResponseDTO;
import com.financeiro.spring.jpa.postgresql.exception.ApiException;
import com.financeiro.spring.jpa.postgresql.model.Transacao;
import com.financeiro.spring.jpa.postgresql.model.User;
import com.financeiro.spring.jpa.postgresql.repository.TransacaoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class RelatorioService {

    private final TransacaoRepository transacaoRepository;

    public RelatorioService(TransacaoRepository transacaoRepository) {
        this.transacaoRepository = transacaoRepository;
    }

    public RelatorioResponseDTO gerarRelatorio(
            User usuario,
            RelatorioFiltro filtro,
            Integer mes,
            Integer ano,
            LocalDate dataInicio,
            LocalDate dataFim
    ) {
        LocalDate inicio;
        LocalDate fim;
        String periodoLabel;

        switch (filtro) {
            case MES_ATUAL -> {
                LocalDate hoje = LocalDate.now();
                inicio = hoje.withDayOfMonth(1);
                fim = hoje.withDayOfMonth(hoje.lengthOfMonth());
                periodoLabel = gerarLabelMes(hoje.getMonthValue(), hoje.getYear());
            }
            case ULTIMOS_30_DIAS -> {
                LocalDate hoje = LocalDate.now();
                fim = hoje;
                inicio = hoje.minusDays(30);
                periodoLabel = "Últimos 30 dias";
            }
            case ESTE_ANO -> {
                int anoAtual = LocalDate.now().getYear();
                inicio = LocalDate.of(anoAtual, 1, 1);
                fim = LocalDate.of(anoAtual, 12, 31);
                periodoLabel = "Ano de " + anoAtual;
            }
            case MES_ESPECIFICO -> {
                if (mes == null || ano == null) {
                    throw new ApiException(
                            HttpStatus.BAD_REQUEST,
                            "Os parâmetros 'mes' e 'ano' são obrigatórios para o filtro MES_ESPECIFICO.",
                            "filtro"
                    );
                }
                if (mes < 1 || mes > 12) {
                    throw new ApiException(
                            HttpStatus.BAD_REQUEST,
                            "O parâmetro 'mes' deve estar entre 1 e 12.",
                            "mes"
                    );
                }
                inicio = LocalDate.of(ano, mes, 1);
                fim = inicio.withDayOfMonth(inicio.lengthOfMonth());
                periodoLabel = gerarLabelMes(mes, ano);
            }
            case RANGE -> {
                if (dataInicio == null || dataFim == null) {
                    throw new ApiException(
                            HttpStatus.BAD_REQUEST,
                            "Os parâmetros 'dataInicio' e 'dataFim' são obrigatórios para o filtro RANGE.",
                            "filtro"
                    );
                }
                if (dataInicio.isAfter(dataFim)) {
                    throw new ApiException(
                            HttpStatus.BAD_REQUEST,
                            "A data de início não pode ser posterior à data de fim.",
                            "dataInicio"
                    );
                }
                inicio = dataInicio;
                fim = dataFim;
                periodoLabel = formatarData(inicio) + " - " + formatarData(fim);
            }
            default -> throw new ApiException(
                    HttpStatus.BAD_REQUEST,
                    "Filtro de relatório inválido.",
                    "filtro"
            );
        }

        List<Transacao> transacoes = transacaoRepository
                .findByUserAndDataBetweenOrderByDataDesc(usuario, inicio, fim);

        BigDecimal totalEntradas = transacoes.stream()
                .filter(t -> t.getTipoMovimentacao() == TipoMovimentacao.ENTRADA)
                .map(Transacao::getValor)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalDespesas = transacoes.stream()
                .filter(t -> t.getTipoMovimentacao() == TipoMovimentacao.DESPESA)
                .map(Transacao::getValor)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal balanco = totalEntradas.subtract(totalDespesas);

        List<Transacao> despesas = transacoes.stream()
                .filter(t -> t.getTipoMovimentacao() == TipoMovimentacao.DESPESA)
                .toList();

        List<DespesaPorCategoriaDTO> despesasPorCategoria = agruparPorCategoria(despesas);
        List<DespesaPorBancoDTO> despesasPorBanco = agruparPorBanco(despesas);

        return RelatorioResponseDTO.builder()
                .periodoLabel(periodoLabel)
                .balanco(balanco)
                .totalEntradas(totalEntradas)
                .totalDespesas(totalDespesas)
                .despesasPorCategoria(despesasPorCategoria)
                .despesasPorBanco(despesasPorBanco)
                .build();
    }

    private List<DespesaPorCategoriaDTO> agruparPorCategoria(List<Transacao> despesas) {
        Map<Long, List<Transacao>> agrupado = despesas.stream()
                .filter(t -> t.getCategoria() != null)
                .collect(Collectors.groupingBy(t -> t.getCategoria().getId()));

        return agrupado.entrySet().stream()
                .map(entry -> {
                    Transacao primeira = entry.getValue().get(0);
                    BigDecimal total = entry.getValue().stream()
                            .map(Transacao::getValor)
                            .reduce(BigDecimal.ZERO, BigDecimal::add);
                    return new DespesaPorCategoriaDTO(
                            primeira.getCategoria().getId(),
                            primeira.getCategoria().getNome(),
                            primeira.getCategoria().getCorHex(),
                            total
                    );
                })
                .sorted((a, b) -> b.getTotal().compareTo(a.getTotal()))
                .toList();
    }

    private List<DespesaPorBancoDTO> agruparPorBanco(List<Transacao> despesas) {
        Map<Long, List<Transacao>> agrupado = despesas.stream()
                .collect(Collectors.groupingBy(t -> t.getBanco().getId()));

        return agrupado.entrySet().stream()
                .map(entry -> {
                    Transacao primeira = entry.getValue().get(0);
                    BigDecimal total = entry.getValue().stream()
                            .map(Transacao::getValor)
                            .reduce(BigDecimal.ZERO, BigDecimal::add);
                    return new DespesaPorBancoDTO(
                            primeira.getBanco().getId(),
                            primeira.getBanco().getNome(),
                            primeira.getBanco().getCorHex(),
                            total
                    );
                })
                .sorted((a, b) -> b.getTotal().compareTo(a.getTotal()))
                .toList();
    }

    private String gerarLabelMes(int mes, int ano) {
        String nomeMes = LocalDate.of(ano, mes, 1)
                .getMonth()
                .getDisplayName(TextStyle.FULL, new Locale("pt", "BR"));
        String nomeCapitalizado = nomeMes.substring(0, 1).toUpperCase() + nomeMes.substring(1);
        return nomeCapitalizado + " de " + ano;
    }

    private String formatarData(LocalDate data) {
        return String.format("%02d/%02d/%04d", data.getDayOfMonth(), data.getMonthValue(), data.getYear());
    }
}
