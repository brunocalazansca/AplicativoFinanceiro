FROM maven:3.8.5-eclipse-temurin-17

RUN apt-get update \
  && apt-get install -y inotify-tools \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /financeiro
CMD ["sh", "-lc", "chmod +x dev.sh && ./dev.sh"]
