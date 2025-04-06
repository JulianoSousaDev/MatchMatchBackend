import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { MatchesService } from './matches.service';
import { Match } from './entities/match.entity';
import { Participant } from './entities/participant.entity';
import { Sport } from './entities/sport.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateMatchDto } from './dto/create-match.dto';
import { CreateSportDto } from './dto/create-sport.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { CreateParticipantDto } from './dto/create-participant.dto'
import { UpdateParticipantDto } from './dto/update-participant.dto';

@ApiTags('matches')
@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as partidas' })
  @ApiResponse({ status: 200, description: 'Lista de partidas retornada com sucesso', type: [Match] })
  findAll(): Promise<Match[]> {
    return this.matchesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma partida pelo ID' })
  @ApiResponse({ status: 200, description: 'Partida encontrada com sucesso', type: Match })
  @ApiResponse({ status: 404, description: 'Partida não encontrada' })
  findOne(@Param('id') id: string): Promise<Match> {
    return this.matchesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar uma nova partida' })
  @ApiResponse({ status: 201, description: 'Partida criada com sucesso', type: Match })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(@Body() createMatchDto: CreateMatchDto, @Req() req): Promise<Match> {
    return this.matchesService.create(createMatchDto, req.user.id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar uma partida existente' })
  @ApiResponse({ status: 200, description: 'Partida atualizada com sucesso', type: Match })
  @ApiResponse({ status: 404, description: 'Partida não encontrada' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateMatchDto: UpdateMatchDto): Promise<Match> {
    return this.matchesService.update(id, updateMatchDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma partida' })
  @ApiResponse({ status: 200, description: 'Partida removida com sucesso' })
  @ApiResponse({ status: 404, description: 'Partida não encontrada' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string): Promise<void> {
    return this.matchesService.remove(id);
  }

  @Get('sports')
  @ApiOperation({ summary: 'Listar todos os esportes' })
  @ApiResponse({ status: 200, description: 'Lista de esportes retornada com sucesso', type: [Sport] })
  findAllSports(): Promise<Sport[]> {
    return this.matchesService.findAllSports();
  }

  @Post('sports')
  @ApiOperation({ summary: 'Criar um novo esporte' })
  @ApiResponse({ status: 201, description: 'Esporte criado com sucesso', type: Sport })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  createSport(@Body() createSportDto: CreateSportDto): Promise<Sport> {
    return this.matchesService.createSport(createSportDto);
  }

  @Post(':matchId/participants')
  @ApiOperation({ summary: 'Adicionar um participante a uma partida' })
  @ApiResponse({ status: 201, description: 'Participante adicionado com sucesso', type: Participant })
  @ApiResponse({ status: 404, description: 'Partida não encontrada' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  addParticipant(
    @Param('matchId') matchId: string,
    @Body() createParticipantDto: CreateParticipantDto,
    @Req() req,
  ): Promise<Participant> {
    return this.matchesService.addParticipant(matchId, req.user.id, createParticipantDto);
  }

  @Put('participants/:id')
  @ApiOperation({ summary: 'Atualizar um participante existente' })
  @ApiResponse({ status: 200, description: 'Participante atualizado com sucesso', type: Participant })
  @ApiResponse({ status: 404, description: 'Participante não encontrado' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  updateParticipant(
    @Param('id') id: string,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ): Promise<Participant> {
    return this.matchesService.updateParticipant(id, updateParticipantDto);
  }
} 