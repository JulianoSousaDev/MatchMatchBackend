import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchesController } from './matches.controller'
import { MatchesService } from './matches.service';
import { Match } from './entities/match.entity';
import { Participant } from './entities/participant.entity';
import { Sport } from './entities/sport.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Match, Participant, Sport, User])],
  controllers: [MatchesController],
  providers: [MatchesService],
  exports: [MatchesService],
})
export class MatchesModule {} 