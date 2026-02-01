#!/bin/sh
set -e

# roda a aplicação (com devtools)
mvn -q -DskipTests spring-boot:run &
APP_PID=$!

echo "Watcher (polling) ativo: recompilando quando src mudar..."

# hash inicial
LAST_HASH=""

while true; do
  # gera um "hash" do conteúdo do src (java + resources)
  HASH=$(find src/main/java src/main/resources -type f 2>/dev/null \
    -exec shasum {} \; | shasum | awk '{print $1}')

  if [ "$HASH" != "$LAST_HASH" ]; then
    LAST_HASH="$HASH"
    echo "Mudança detectada. Compilando..."
    mvn -q -DskipTests compile
  fi

  sleep 1
done

wait $APP_PID
