package com.financeiro.spring.jpa.postgresql.service;

import com.financeiro.spring.jpa.postgresql.dto.AuthResponseDTO;
import com.financeiro.spring.jpa.postgresql.dto.LoginRequestDTO;
import com.financeiro.spring.jpa.postgresql.dto.UserCreateRequestDTO;
import com.financeiro.spring.jpa.postgresql.dto.UserResponseDTO;
import com.financeiro.spring.jpa.postgresql.exception.ApiException;
import com.financeiro.spring.jpa.postgresql.model.User;
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
        if (dto.getNome() == null || dto.getNome().trim().isEmpty()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "O nome é obrigatório.", "nome");
        }
        if (dto.getEmail() == null || dto.getEmail().trim().isEmpty()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "O email é obrigatório.", "email");
        }
        if (dto.getSenha() == null || dto.getSenha().trim().length() < 6) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "A senha deve ter pelo menos 6 caracteres.", "senha");
        }

        if (usersRepository.existsByEmail(dto.getEmail())) {
            throw new ApiException(HttpStatus.CONFLICT, "Este email já está cadastrado em nossa base.", "email");
        }

        User user = new User();
        user.setNome(dto.getNome());
        user.setEmail(dto.getEmail());
        user.setSenha(passwordEncoder.encode(dto.getSenha()));

        User saved = usersRepository.save(user);

        return new UserResponseDTO(saved.getId(), saved.getNome(), saved.getEmail());
    }

    public AuthResponseDTO login(LoginRequestDTO dto) {

        if (dto.getEmail() == null || dto.getEmail().trim().isEmpty()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Informe o email para continuar.", "email");
        }
        if (dto.getSenha() == null || dto.getSenha().trim().isEmpty()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Informe a senha para continuar.", "senha");
        }

        User user = usersRepository.findByEmail(dto.getEmail())
            .orElseThrow(() -> new ApiException(
                HttpStatus.UNAUTHORIZED,
                "Email ou senha incorretos.",
                "credenciais"
            ));

        if (!passwordEncoder.matches(dto.getSenha(), user.getSenha())) {
            throw new ApiException(
                HttpStatus.UNAUTHORIZED,
                "Email ou senha incorretos.",
                "credenciais"
            );
        }

        String token = jwtDTO.generateToken(user.getId(), user.getEmail());

        UserResponseDTO userResp = new UserResponseDTO(user.getId(), user.getNome(), user.getEmail());
        return new AuthResponseDTO(token, "Bearer", userResp);
    }
}