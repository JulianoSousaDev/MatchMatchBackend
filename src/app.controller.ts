import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Retorna uma mensagem de boas-vindas' })
  @ApiResponse({ 
    status: 200, 
    description: 'Mensagem de boas-vindas',
    schema: {
      type: 'string',
      example: 'Bem-vindo ao backend do MatchMatch!'
    }
  })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('teste')
  @ApiOperation({ summary: 'Endpoint de teste' })
  @ApiResponse({ 
    status: 200, 
    description: 'Mensagem de teste',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Esta é uma rota de teste do backend!' }
      }
    }
  })
  getTest(): { message: string } {
    return { message: 'Esta é uma rota de teste do backend!' };
  }

  @Get('routes')
  @ApiOperation({ summary: 'Exibe todas as rotas disponíveis na API' })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de rotas disponíveis',
    schema: {
      type: 'object',
      properties: {
        routes: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              path: { type: 'string' },
              method: { type: 'string' },
              description: { type: 'string' }
            }
          }
        }
      }
    }
  })
  getRoutes() {
    return {
      routes: [
        { path: '/', method: 'GET', description: 'Retorna uma mensagem de boas-vindas' },
        { path: '/teste', method: 'GET', description: 'Endpoint de teste' },
        { path: '/routes', method: 'GET', description: 'Exibe todas as rotas disponíveis na API' },
        { path: '/auth/login', method: 'POST', description: 'Faz login de um usuário' },
        { path: '/auth/register', method: 'POST', description: 'Registra um novo usuário' },
        { path: '/users/profile', method: 'GET', description: 'Obtém o perfil do usuário logado (requer autenticação)' },
      ]
    };
  }
} 