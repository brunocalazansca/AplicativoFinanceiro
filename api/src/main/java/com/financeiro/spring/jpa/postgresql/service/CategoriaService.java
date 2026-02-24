package com.financeiro.spring.jpa.postgresql.service;

import com.financeiro.spring.jpa.postgresql.dto.CategoriaCreateRequestDTO;
import com.financeiro.spring.jpa.postgresql.dto.CategoriaResponseDTO;
import com.financeiro.spring.jpa.postgresql.exception.ApiException;
import com.financeiro.spring.jpa.postgresql.model.Categoria;
import com.financeiro.spring.jpa.postgresql.model.User;
import com.financeiro.spring.jpa.postgresql.repository.CategoriaRepository;
import com.financeiro.spring.jpa.postgresql.repository.TransacaoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaService {
    private final CategoriaRepository categoriaRepository;
    private final TransacaoRepository transacaoRepository;

    public CategoriaService(
            CategoriaRepository categoriaRepository,
            TransacaoRepository transacaoRepository
    ) {
        this.categoriaRepository = categoriaRepository;
        this.transacaoRepository = transacaoRepository;
    }

    public CategoriaResponseDTO cadastrarCategoria(User usuario, CategoriaCreateRequestDTO req) {
        if (req.getNome() == null || req.getNome().trim().isEmpty()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "O nome da categoria é obrigatório.", "nome");
        }

        if (req.getCorHex() == null || req.getCorHex().trim().isEmpty()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "A cor de identificação é obrigatória.", "corHex");
        }

        if (categoriaRepository.existsByUserAndNomeIgnoreCase(usuario, req.getNome())) {
            throw new ApiException(HttpStatus.CONFLICT, "Categoria já cadastrada", "nome");
        }

        Categoria categoria = new Categoria();
        categoria.setNome(req.getNome());
        categoria.setUser(usuario);
        categoria.setCorHex(req.getCorHex());

        Categoria categoriaSalva = categoriaRepository.save(categoria);

        return new CategoriaResponseDTO(
            categoriaSalva.getId(), categoriaSalva.getNome(), categoriaSalva.getCorHex()
        );
    }

    public List<CategoriaResponseDTO> listarCategorias(User usuario) {
        return categoriaRepository.findByUser(usuario).stream()
                .map(c -> new CategoriaResponseDTO(c.getId(), c.getNome(), c.getCorHex()))
                .toList();
    }

    public String deletarCategoria(User usuarioLogado, Long idCategoria) {

        Categoria categoria = categoriaRepository.findByIdAndUser(idCategoria, usuarioLogado)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Categoria não encontrada ou você não tem permissão para acessá-la.", "idCategoria"));

        if (transacaoRepository.existsByCategoriaId(idCategoria)) {
            throw new ApiException(
                    HttpStatus.BAD_REQUEST,
                    "Não é possível excluir a categoria '" + categoria.getNome() + "' porque existem transações vinculadas a ela.",
                    "categoria"
            );
        }

        String nomeCategoria = categoria.getNome();
        categoriaRepository.delete(categoria);

        return nomeCategoria;
    }
}
