# Teste técnico UnMEP
Aplicação desenvolvida para processar registros de atividades de funcionários e gerar um relatório consolidado em JSON.

## Execução do projeto
Para executar o projeto, digite o seguinte comando na raiz do repositório:

```docker-compose up –build```

Alternativamente, caso utilize Podman:

```podman-compose up –build```

## Tecnologias utilizadas
- Node.js
- TypeScript
- Podman

## Decisões técnicas
- Escolhi TypeScript para melhorar a segurança de tipos e facilitar a manutenção
- Separei a lógica das regras de negócio da leitura do JSON, para aumentar a legibilidade do código
- Separei as regras de negócio em suas próprias funções para evitar a criação de uma super função
