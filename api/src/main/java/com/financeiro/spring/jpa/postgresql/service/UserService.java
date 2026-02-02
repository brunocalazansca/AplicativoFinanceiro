package com.financeiro.spring.jpa.postgresql.service;

import com.financeiro.spring.jpa.postgresql.dto.*;
import com.financeiro.spring.jpa.postgresql.exception.ApiException;
import com.financeiro.spring.jpa.postgresql.model.Users;
import com.financeiro.spring.jpa.postgresql.repository.UsersRepository;
import com.financeiro.spring.jpa.postgresql.security.JwtDTO;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtDTO jwtDTO;

    public UserService(
            UsersRepository usersRepository,
            PasswordEncoder passwordEncoder,
            JwtDTO jwtDTO
    ) {
        this.usersRepository = usersRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtDTO = jwtDTO;
    }

    public UserResponseDTO create(UserCreateRequestDTO dto) {

        if (usersRepository.existsByEmail(dto.getEmail())) {
            throw new ApiException(HttpStatus.CONFLICT, "Email já cadastrado", "email");
        }

        Users user = new Users();
        user.setNome(dto.getNome());
        user.setEmail(dto.getEmail());
        user.setSenha(passwordEncoder.encode(dto.getSenha()));

        Users saved = usersRepository.save(user);

        return new UserResponseDTO(saved.getId(), saved.getNome(), saved.getEmail());
    }

    public AuthResponseDTO login(LoginRequestDTO dto) {

        Users user = usersRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Usuário não encontrado", "email"));

        if (!passwordEncoder.matches(dto.getSenha(), user.getSenha())) {
            throw new ApiException(HttpStatus.UNAUTHORIZED, "Senha incorreta", "senha");
        }

        String token = jwtDTO.generateToken(user.getId(), user.getEmail());

        UserResponseDTO userResp = new UserResponseDTO(user.getId(), user.getNome(), user.getEmail());
        return new AuthResponseDTO(token, "Bearer", userResp);
    }
}
