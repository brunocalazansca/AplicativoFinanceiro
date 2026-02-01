package com.financeiro.spring.jpa.postgresql.controller;

import com.financeiro.spring.jpa.postgresql.dto.UsersDTO;
import com.financeiro.spring.jpa.postgresql.model.Users;
import com.financeiro.spring.jpa.postgresql.repository.UsersRepository;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class UsersController {

    private final UsersRepository usersRepository;

    public UsersController(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    @PostMapping("/users")
    public ResponseEntity<?> create(@Valid @RequestBody UsersDTO dto) {

        if (usersRepository.existsByEmail(dto.getEmail())) {
            Map<String, Object> body = new LinkedHashMap<>();
            body.put("status", 409);
            body.put("error", "Email já cadastrado");
            body.put("field", "email");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(body);
        }

        Users user = new Users();
        user.setNome(dto.getNome());
        user.setEmail(dto.getEmail());
        user.setSenha(dto.getSenha());

        Users saved = usersRepository.save(user);

        Map<String, Object> resp = new LinkedHashMap<>();
        resp.put("id", saved.getId());
        resp.put("nome", saved.getNome());
        resp.put("email", saved.getEmail());

        return ResponseEntity.status(HttpStatus.CREATED).body(resp);
    }
}
