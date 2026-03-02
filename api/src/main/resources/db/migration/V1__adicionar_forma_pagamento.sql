CREATE TABLE IF NOT EXISTS forma_pagamento (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO forma_pagamento (nome) VALUES
    ('PIX'),
    ('Cartão de Débito'),
    ('Cartão de Crédito'),
    ('Dinheiro'),
    ('Boleto')
ON CONFLICT (nome) DO NOTHING;