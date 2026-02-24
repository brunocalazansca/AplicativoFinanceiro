package com.financeiro.spring.jpa.postgresql.service;

import com.financeiro.spring.jpa.postgresql.dto.CategoriaCreateRequestDTO;
import com.financeiro.spring.jpa.postgresql.dto.CategoriaResponseDTO;
import com.financeiro.spring.jpa.postgresql.exception.ApiException;
import com.financeiro.spring.jpa.postgresql.model.Categoria;
import com.financeiro.spring.jpa.postgresql.model.User;
import com.financeiro.spring.jpa.postgresql.repository.CategoriaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaService {
    private final CategoriaRepository categoriaRepository;

    public CategoriaService(CategoriaRepository repo) {
        this.categoriaRepository = repo;
    }

    public CategoriaResponseDTO cadastrarCategoria(User usuario, CategoriaCreateRequestDTO req) {
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

    public String deletarCategoria(User usuarioLogado, Long idBanco) {
        Categoria cateroria = categoriaRepository.findByIdAndUser(idBanco, usuarioLogado)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Categoria não encontrada", "id-categoria"));

        String nomeCategoria = cateroria.getNome();
        categoriaRepository.delete(cateroria);

        return nomeCategoria;
    }
}
