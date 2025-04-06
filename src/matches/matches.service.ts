import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from './entities/match.entity';
import { Participant } from './entities/participant.entity';
import { Sport } from './entities/sport.entity';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { CreateSportDto } from './dto/create-sport.dto';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';

@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(Match)
    private matchRepository: Repository<Match>,
    @InjectRepository(Participant)
    private participantRepository: Repository<Participant>,
    @InjectRepository(Sport)
    private sportRepository: Repository<Sport>,
  ) {}

  async findAll(): Promise<Match[]> {
    const matches = await this.matchRepository.find({
      relations: ['sport', 'creator']
    });
    
    // Para cada partida, converter location de string para objeto e buscar participantes
    for (const match of matches) {
      // Converter location
      if (match.location && typeof match.location === 'string') {
        try {
          match.location = JSON.parse(match.location);
        } catch (e) {
          // Se não for um JSON válido, mantém como string
        }
      }
      
      // Buscar participantes
      const participants = await this.participantRepository.find({
        where: { matchId: match.id },
        relations: ['user']
      });
      
      // Adicionar participantes ao objeto da partida
      Object.assign(match, { participants });
    }
    
    return matches;
  }

  async findOne(id: string): Promise<Match> {
    const match = await this.matchRepository.findOne({ 
      where: { id },
      relations: ['sport', 'creator'] 
    });
    
    if (!match) {
      throw new NotFoundException(`Partida com ID ${id} não encontrada`);
    }
    
    // Converter location de JSON string para objeto
    if (match.location && typeof match.location === 'string') {
      try {
        match.location = JSON.parse(match.location);
      } catch (e) {
        // Se não for um JSON válido, mantém como string
      }
    }
    
    // Buscar participantes da partida
    const participants = await this.participantRepository.find({
      where: { matchId: id },
      relations: ['user']
    });
    
    // Adicionar participantes ao objeto da partida
    Object.assign(match, { participants });
    
    return match;
  }

  async findAllSports(): Promise<Sport[]> {
    return this.sportRepository.find();
  }

  async createSport(createSportDto: CreateSportDto): Promise<Sport> {
    const sport = this.sportRepository.create(createSportDto);
    return this.sportRepository.save(sport);
  }

  async create(createMatchDto: CreateMatchDto, userId: string): Promise<Match> {
    const sport = await this.sportRepository.findOne({ where: { id: createMatchDto.sportId } });
    if (!sport) {
      throw new NotFoundException(`Esporte com ID ${createMatchDto.sportId} não encontrado`);
    }

    // Verifica se maxParticipants está definido e aplica valor padrão se necessário
    if (createMatchDto.maxParticipants === undefined || createMatchDto.maxParticipants === null) {
      createMatchDto.maxParticipants = 10; // Valor padrão
    }

    // Se location for um objeto, converte para string
    if (typeof createMatchDto.location === 'object') {
      createMatchDto.location = JSON.stringify(createMatchDto.location);
    }

    const match = this.matchRepository.create({
      ...createMatchDto,
      creatorId: userId,
    });

    return this.matchRepository.save(match);
  }

  async update(id: string, updateMatchDto: UpdateMatchDto): Promise<Match> {
    const match = await this.matchRepository.findOne({ where: { id } });
    if (!match) {
      throw new NotFoundException(`Partida com ID ${id} não encontrada`);
    }

    if (updateMatchDto.sportId) {
      const sport = await this.sportRepository.findOne({ where: { id: updateMatchDto.sportId } });
      if (!sport) {
        throw new NotFoundException(`Esporte com ID ${updateMatchDto.sportId} não encontrado`);
      }
    }

    Object.assign(match, updateMatchDto);
    return this.matchRepository.save(match);
  }

  async remove(id: string): Promise<void> {
    const match = await this.matchRepository.findOne({ where: { id } });
    if (!match) {
      throw new NotFoundException(`Partida com ID ${id} não encontrada`);
    }
    await this.matchRepository.remove(match);
  }

  async findUserMatches(userId: string, status?: string[]): Promise<Match[]> {
    // Busca participações do usuário
    const query = this.participantRepository
      .createQueryBuilder('participant')
      .leftJoinAndSelect('participant.user', 'user')
      .where('participant.userId = :userId', { userId });

    // Filtra por status específicos se forem fornecidos
    if (status && status.length > 0) {
      query.andWhere('participant.status IN (:...status)', { status });
    }

    // Busca as participações
    const participations = await query.getMany();
    
    // Extrai os IDs das partidas das participações
    const matchIds = participations.map(p => p.matchId);
    
    // Se não houver participações, busca apenas as partidas criadas pelo usuário
    let matches: Match[];
    if (matchIds.length === 0) {
      matches = await this.matchRepository
        .createQueryBuilder('match')
        .where('match.creatorId = :userId', { userId })
        .leftJoinAndSelect('match.sport', 'sport')
        .leftJoinAndSelect('match.creator', 'creator')
        .getMany();
    } else {
      // Busca todas as partidas que o usuário participa ou criou
      matches = await this.matchRepository
        .createQueryBuilder('match')
        .where('match.id IN (:...matchIds)', { matchIds })
        .orWhere('match.creatorId = :userId', { userId })
        .leftJoinAndSelect('match.sport', 'sport')
        .leftJoinAndSelect('match.creator', 'creator')
        .getMany();
    }
    
    // Para cada partida, converter location de string para objeto e buscar participantes
    for (const match of matches) {
      // Converter location
      if (match.location && typeof match.location === 'string') {
        try {
          match.location = JSON.parse(match.location);
        } catch (e) {
          // Se não for um JSON válido, mantém como string
        }
      }
      
      // Buscar participantes
      const participants = await this.participantRepository.find({
        where: { matchId: match.id },
        relations: ['user']
      });
      
      // Adicionar participantes ao objeto da partida
      Object.assign(match, { participants });
    }
    
    return matches;
  }

  async addParticipant(
    matchId: string,
    userId: string,
    createParticipantDto: CreateParticipantDto,
  ): Promise<Participant> {
    const match = await this.matchRepository.findOne({ where: { id: matchId } });
    if (!match) {
      throw new NotFoundException(`Partida com ID ${matchId} não encontrada`);
    }

    // Verificar se o usuário já é um participante
    const existingParticipant = await this.participantRepository.findOne({
      where: { matchId, userId },
    });

    if (existingParticipant) {
      return existingParticipant;
    }

    const participant = this.participantRepository.create({
      matchId,
      userId,
      score: createParticipantDto.score || 0,
      status: 'PENDING',
    });

    return this.participantRepository.save(participant);
  }

  async updateParticipant(id: string, updateParticipantDto: UpdateParticipantDto): Promise<Participant> {
    const participant = await this.participantRepository.findOne({ where: { id } });
    if (!participant) {
      throw new NotFoundException(`Participante com ID ${id} não encontrado`);
    }

    Object.assign(participant, updateParticipantDto);
    return this.participantRepository.save(participant);
  }
} 