CREATE TABLE IF NOT EXISTS forma_pagamento (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE,
    cor_hex VARCHAR(7) NOT NULL
);

INSERT INTO forma_pagamento (nome, cor_hex) VALUES
    ('PIX', '#00BDB3'),
    ('Cartão de Débito', '#1E90FF'),
    ('Cartão de Crédito', '#FF4500'),
    ('Dinheiro', '#2E8B57'),
    ('Boleto', '#696969'),
    ('Outro', '#0F5681')
ON CONFLICT (nome) DO NOTHING;