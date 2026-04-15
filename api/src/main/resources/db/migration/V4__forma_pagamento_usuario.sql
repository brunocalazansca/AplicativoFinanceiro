ALTER TABLE forma_pagamento
    DROP CONSTRAINT IF EXISTS forma_pagamento_nome_key,
    ADD COLUMN IF NOT EXISTS usuario_id BIGINT,
    ADD CONSTRAINT fk_forma_pagamento_usuario FOREIGN KEY (usuario_id) REFERENCES users(id) ON DELETE CASCADE,
    ADD CONSTRAINT uk_usuario_forma_pagamento UNIQUE (usuario_id, nome);
