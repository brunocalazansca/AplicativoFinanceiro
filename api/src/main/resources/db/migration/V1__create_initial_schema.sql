-- 1. Tabela de Usuários (Pai de quase todas)
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

-- 2. Tabela de Formas de Pagamento (Independente)
CREATE TABLE IF NOT EXISTS forma_pagamento (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE,
    cor_hex VARCHAR(7)
);

-- 3. Tabela de Bancos (Depende de users)
CREATE TABLE IF NOT EXISTS banco (
    id BIGSERIAL PRIMARY KEY,
    usuario_id BIGINT NOT NULL,
    nome VARCHAR(120) NOT NULL,
    cor_hex VARCHAR(7) NOT NULL,
    saldo DECIMAL(18, 2) NOT NULL DEFAULT 0.00,
    qtd_transacoes BIGINT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    CONSTRAINT fk_banco_usuario FOREIGN KEY (usuario_id) REFERENCES users(id),
    CONSTRAINT uk_usuario_banco UNIQUE (usuario_id, nome)
);

-- 4. Tabela de Categorias (Depende de users)
CREATE TABLE IF NOT EXISTS categorias (
    id BIGSERIAL PRIMARY KEY,
    usuario_id BIGINT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    cor_hex VARCHAR(7),
    CONSTRAINT fk_categoria_usuario FOREIGN KEY (usuario_id) REFERENCES users(id),
    CONSTRAINT uk_usuario_categoria UNIQUE (usuario_id, nome)
);

-- 5. Tabela de Transações (Depende de todas as anteriores)
CREATE TABLE IF NOT EXISTS transacoes (
    id BIGSERIAL PRIMARY KEY,
    usuario_id BIGINT NOT NULL,
    banco_id BIGINT NOT NULL,
    categoria_id BIGINT,
    forma_pagamento_id BIGINT,
    tipo_movimentacao VARCHAR(20) NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    valor DECIMAL(18, 2) NOT NULL,
    data DATE NOT NULL,
    created_at TIMESTAMP NOT NULL,
    CONSTRAINT fk_transacao_usuario FOREIGN KEY (usuario_id) REFERENCES users(id),
    CONSTRAINT fk_transacao_banco FOREIGN KEY (banco_id) REFERENCES banco(id),
    CONSTRAINT fk_transacao_categoria FOREIGN KEY (categoria_id) REFERENCES categorias(id),
    CONSTRAINT fk_transacao_forma_pagamento FOREIGN KEY (forma_pagamento_id) REFERENCES forma_pagamento(id)
);