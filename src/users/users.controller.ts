import { Controller, Get, Post, Body, UseGuards, Request, Put, HttpCode, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddFavoriteSportDto, FavoriteSportResponseDto } from './dto/favorite-sport.dto';

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
        id: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174000' },
        email: { type: 'string', example: 'usuario@exemplo.com' }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile/detailed')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtém informações detalhadas do perfil do usuário' })
  @ApiResponse({ 
    status: 200, 
    description: 'Retorna as informações detalhadas do perfil do usuário',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174000' },
        fullName: { type: 'string', example: 'João Silva' },
        email: { type: 'string', example: 'usuario@exemplo.com' },
        profileImageUrl: { type: 'string', example: 'https://exemplo.com/fotos/perfil.jpg' },
        age: { type: 'number', example: 25 },
        city: { type: 'string', example: 'São Paulo' },
        favoriteSports: { type: 'array', items: { type: 'string' }, example: ['Futebol', 'Vôlei'] },
        points: { type: 'number', example: 500 },
        googleId: { type: 'string', example: '112389471734921' }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async getDetailedProfile(@Request() req) {
    return this.usersService.getUserProfile(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile')
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualiza as informações do perfil do usuário' })
  @ApiResponse({ 
    status: 200, 
    description: 'Perfil atualizado com sucesso',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174000' },
        fullName: { type: 'string', example: 'João Silva' },
        email: { type: 'string', example: 'usuario@exemplo.com' },
        profileImageUrl: { type: 'string', example: 'https://exemplo.com/fotos/perfil.jpg' },
        age: { type: 'number', example: 25 },
        city: { type: 'string', example: 'São Paulo' },
        favoriteSports: { type: 'array', items: { type: 'string' }, example: ['Futebol', 'Vôlei'] },
        points: { type: 'number', example: 500 },
        googleId: { type: 'string', example: '112389471734921' }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUserProfile(req.user.id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('favorite-sports')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lista os esportes favoritos do usuário' })
  @ApiResponse({ 
    status: 200, 
    description: 'Retorna a lista de esportes favoritos do usuário',
    type: [FavoriteSportResponseDto]
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  async getFavoriteSports(@Request() req) {
    return this.usersService.getFavoriteSports(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('favorite-sports')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Adiciona um esporte aos favoritos do usuário' })
  @ApiResponse({ 
    status: 201, 
    description: 'Esporte adicionado com sucesso aos favoritos',
    type: FavoriteSportResponseDto
  })
  @ApiResponse({ status: 400, description: 'Este esporte já está na lista de favoritos' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 404, description: 'Esporte não encontrado' })
  async addFavoriteSport(@Request() req, @Body() addFavoriteSportDto: AddFavoriteSportDto) {
    return this.usersService.addFavoriteSport(req.user.id, addFavoriteSportDto.sportId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('favorite-sports/:id')
  @HttpCode(204)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove um esporte dos favoritos do usuário' })
  @ApiParam({ name: 'id', description: 'ID do registro de esporte favorito', type: 'string' })
  @ApiResponse({ status: 204, description: 'Esporte removido com sucesso dos favoritos' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 404, description: 'Esporte favorito não encontrado' })
  async removeFavoriteSport(@Request() req, @Param('id') favoriteId: string) {
    return this.usersService.removeFavoriteSport(req.user.id, favoriteId);
  }
} 