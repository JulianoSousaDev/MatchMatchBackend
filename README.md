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