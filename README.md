# IoT Dashboard Project

Este é um projeto de Dashboard IoT composto por um backend e um frontend. O backend é implementado com Node.js e Express, enquanto o frontend é implementado com React.

## Requisitos

- Node.js (versão 12 ou superior)
- npm (versão 6 ou superior)

## Configuração do Backend

1. Navegue até a pasta `backend`:

    ```sh
    cd backend
    ```

2. Instale as dependências:

    ```sh
    npm install
    ```

3. Inicie o servidor backend:

    ```sh
    npm start
    ```

    O servidor backend estará em execução em `http://localhost:3003`.

## Configuração do Frontend

1. Navegue até a pasta `frontend`:

    ```sh
    cd ../frontend
    ```

2. Instale as dependências:

    ```sh
    npm install
    ```

3. Inicie o servidor frontend:

    ```sh
    npm start
    ```

    O servidor frontend estará em execução em `http://localhost:3000`.

## Notas Adicionais

- Certifique-se de que o backend esteja em execução antes de iniciar o frontend para que as chamadas de API funcionem corretamente.
- Se necessário, configure as variáveis de ambiente no backend para conectar ao banco de dados e outros serviços.
- A estrutura de diretórios é a seguinte:

    ```
    .
    ├── backend
    │   ├── node_modules
    │   ├── src
    │   ├── package.json
    │   └── ...
    ├── frontend
    │   ├── node_modules
    │   ├── src
    │   ├── package.json
    │   └── ...
    └── README.md
    ```

## Tecnologias Utilizadas

- **Backend**: Node.js, Express, Mongoose (para MongoDB)
- **Frontend**: React, Bootstrap
