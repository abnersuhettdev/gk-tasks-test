# Gerenciador de Tarefas

Este projeto é um Gerenciador de Tarefas simples (CRUD), desenvolvido com tecnologias modernas, utilizando TypeScript em todo o stack (frontend e backend) para maior segurança e robustez.

## Tecnologias

# FrontEnd

- Next.js 13+
  Framework React fullstack moderno.
  Utilizado aqui para construir a interface de usuário do gerenciador de tarefas.

- Tailwind CSS
  Usado para criar o layout, botões, cards e alertas de forma simples e visualmente agradável.

- Date-fns
  Biblioteca de manipulação de datas.
  Usada para formatação e operações com datas de forma leve e eficiente.

- React icons
  Utilizada para adicionar ícones visuais (ex.: botões, menus e tarefas) deixando a interface mais intuitiva.

# Backend

- Express.js
  Utilizado para criar a API REST que faz o gerenciamento de tarefas (criar, editar, listar e excluir).
  Fornece endpoints que o frontend consome para persistir as tarefas.

- JSON
  Utilizado como estrutura simples de persistência (mock de banco de dados).
  Permite leitura e escrita de tarefas durante o desenvolvimento sem necessidade de banco de dados real.

- Nodemon
  Ferramenta de desenvolvimento.
  Monitora automaticamente o código do backend e reinicia o servidor sempre que há alterações.
  Facilita o desenvolvimento, evitando restart manual do servidor a cada mudança.

- UUID
  Biblioteca usada para gerar IDs únicos para cada tarefa.
  Garante que cada tarefa tenha um identificador seguro e único.

## Instalação e execução

### Backend

Editar o arquivo .env.example trocando os valores se necessário
Ou criar um arquivo .env com as variáveis indicadas no .env.example

### Rodar os comandos:

```bash
cd backend
npm install
npm run dev
```

### FrontEnd

Editar o arquivo .env.example trocando os valores se necessário
Ou criar um arquivo .env com as variáveis indicadas no .env.example

### Rodar os comandos:

```bash
cd frontend
npm install
npm run dev
```

## Resumo do fluxo

O frontend faz requisições HTTP para o backend via API REST.

O backend manipula as tarefas persistidas no arquivo JSON.

Cada tarefa criada recebe um ID único (UUID).

Durante o desenvolvimento, o nodemon garante atualização automática do servidor ao salvar alterações no código.
