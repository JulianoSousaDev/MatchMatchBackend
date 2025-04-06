# MatchMatch Backend

Backend para o aplicativo MatchMatch desenvolvido em React Native.

## Tecnologias

- Node.js
- NestJS
- TypeScript
- SQLite (banco de dados)
- Swagger (documentação da API)

## Instalação

```bash
# Instalar dependências
npm install

# Desenvolvimento
npm run start:dev

# Produção
npm run build
npm run start:prod
```

## Documentação da API

A documentação completa da API está disponível em `/api` quando o servidor estiver rodando (por exemplo, http://localhost:3000/api).

## Rotas Disponíveis

### Principal
- `GET /` - Retorna mensagem de boas-vindas
- `GET /routes` - Lista todas as rotas disponíveis

### Autenticação
- `POST /auth/register` - Registra um novo usuário
  - Requer: `email`, `password`, `fullName`
  - Retorna: token de acesso, dados do usuário e status de sucesso
  
- `POST /auth/login` - Realiza login
  - Requer: `email`, `password`
  - Retorna: token de acesso e dados básicos do usuário

### Usuários
- `GET /users/profile` - Obtém informações básicas do perfil do usuário autenticado
  - Requer: token de autenticação
  - Retorna: id e email do usuário

- `GET /users/profile/detailed` - Obtém informações detalhadas do perfil do usuário
  - Requer: token de autenticação
  - Retorna: informações completas (id, email, nome completo, pontuação, foto, idade, etc.)

- `PUT /users/profile` - Atualiza informações do perfil do usuário
  - Requer: token de autenticação
  - Aceita: `fullName`, `profileImageUrl`, `age`, `city`, `favoriteSports`, `points`
  - Retorna: informações atualizadas do perfil

## Rotas para Usuários (Users)

### Obter Perfil
- **URL:** `/users/profile`
- **Método:** `GET`
- **Requer Auth:** Sim
- **Resposta de Sucesso:** 
  - **Código:** 200 OK
  - **Conteúdo:** Dados básicos do perfil

### Obter Perfil Detalhado
- **URL:** `/users/profile/detailed`
- **Método:** `GET`
- **Requer Auth:** Sim
- **Resposta de Sucesso:** 
  - **Código:** 200 OK
  - **Conteúdo:** Dados completos do perfil

### Atualizar Perfil
- **URL:** `/users/profile`
- **Método:** `PUT`
- **Requer Auth:** Sim
- **Corpo da Requisição:** Campos a serem atualizados
- **Resposta de Sucesso:** 
  - **Código:** 200 OK
  - **Conteúdo:** Perfil atualizado

### Listar Esportes Favoritos
- **URL:** `/users/favorite-sports`
- **Método:** `GET`
- **Requer Auth:** Sim
- **Resposta de Sucesso:** 
  - **Código:** 200 OK
  - **Conteúdo:** Lista de esportes favoritos

### Adicionar Esporte aos Favoritos
- **URL:** `/users/favorite-sports`
- **Método:** `POST`
- **Requer Auth:** Sim
- **Corpo da Requisição:** 
  ```json
  {
    "sportId": "123e4567-e89b-12d3-a456-426614174000"
  }
  ```
- **Resposta de Sucesso:** 
  - **Código:** 201 CREATED
  - **Conteúdo:** Detalhes do esporte favorito adicionado

### Remover Esporte dos Favoritos
- **URL:** `/users/favorite-sports/:id`
- **Método:** `DELETE`
- **Requer Auth:** Sim
- **Parâmetros:**
  - **URL:** `id` - ID do registro de esporte favorito
- **Resposta de Sucesso:** 
  - **Código:** 204 NO CONTENT

## Rotas para Partidas (Matches)

### Listar todas as partidas
- **URL:** `/matches`
- **Método:** `GET`
- **Requer Auth:** Não
- **Resposta de Sucesso:** 
  - **Código:** 200 OK
  - **Conteúdo:** Lista de objetos de partidas

### Listar partidas de um usuário
- **URL:** `/matches/my-matches`
- **Método:** `GET`
- **Requer Auth:** Sim
- **Parâmetros (opcional):**
  - **Query:** `status` - Array de status de participação (PENDING, CONFIRMED, CANCELLED)
- **Resposta de Sucesso:** 
  - **Código:** 200 OK
  - **Conteúdo:** Lista de partidas que o usuário participa, foi convidado ou criou

### Buscar partida por ID
- **URL:** `/matches/:id`
- **Método:** `GET`
- **Requer Auth:** Não
- **Parâmetros:**
  - **URL:** `id` - ID da partida
- **Resposta de Sucesso:** 
  - **Código:** 200 OK
  - **Conteúdo:** Objeto de partida
- **Resposta de Erro:**
  - **Código:** 404 NOT FOUND
  - **Conteúdo:** `{ "message": "Partida com ID [id] não encontrada" }`

## Modelos de Dados

### Usuário
- `id` (UUID) - Identificador único do usuário
- `fullName` (String) - Nome completo do usuário (obrigatório)
- `email` (String) - Email do usuário (obrigatório, único)
- `password` (String) - Senha do usuário (hash)
- `points` (Number) - Pontuação do usuário (padrão: 500)
- `profileImageUrl` (String) - URL da imagem de perfil
- `age` (Number) - Idade do usuário
- `city` (String) - Cidade do usuário
- `favoriteSports` (Array) - Lista de esportes favoritos
- `googleId` (String) - ID do Google para autenticação
- `accessToken` (String) - Token JWT para autenticação 