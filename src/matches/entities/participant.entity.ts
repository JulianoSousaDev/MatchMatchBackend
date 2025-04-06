import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { Match } from './match.entity';

@Entity()
export class Participant {
  @ApiProperty({
    description: 'ID único do participante',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'ID da partida',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Column()
  matchId: string;

  @ApiProperty({
    description: 'ID do usuário',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Column()
  userId: string;

  @ApiProperty({
    description: 'Pontuação do participante',
    example: 10,
  })
  @Column({ default: 0 })
  score: number;

  @ApiProperty({
    description: 'Status do participante',
    example: 'CONFIRMED',
    enum: ['PENDING', 'CONFIRMED', 'CANCELLED'],
  })
  @Column({
    type: 'simple-enum',
    enum: ['PENDING', 'CONFIRMED', 'CANCELLED'],
    default: 'PENDING',
  })
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';

  @ApiProperty({
    description: 'Data de confirmação',
    example: '2024-03-20T10:00:00Z',
  })
  @Column({ type: 'datetime', nullable: true })
  confirmedAt: Date | null;

  @ApiProperty({
    description: 'Data de cancelamento',
    example: '2024-03-20T10:00:00Z',
  })
  @Column({ type: 'datetime', nullable: true })
  cancelledAt: Date | null;

  @ApiProperty({
    description: 'Usuário participante',
    type: () => User
  })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ApiProperty({
    description: 'Partida relacionada',
    type: () => Match
  })
  @ManyToOne(() => Match, match => match.participants)
  @JoinColumn({ name: 'matchId' })
  match: Match;
} 