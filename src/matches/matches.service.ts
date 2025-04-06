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
    return this.matchRepository.find();
  }

  async findOne(id: string): Promise<Match> {
    const match = await this.matchRepository.findOne({ where: { id } });
    if (!match) {
      throw new NotFoundException(`Partida com ID ${id} não encontrada`);
    }
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