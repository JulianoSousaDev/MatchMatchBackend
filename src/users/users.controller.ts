import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtém o perfil do usuário logado' })
  @ApiResponse({ 
    status: 200, 
    description: 'Retorna os dados do perfil do usuário',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        email: { type: 'string', example: 'usuario@exemplo.com' }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  getProfile(@Request() req) {
    return req.user;
  }
} 