import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Sport } from './sport.entity';
import { User } from '../../users/entities/user.entity';
import { Participant } from './participant.entity';

@Entity()
export class Match {
  @ApiProperty({
    description: 'ID único da partida',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'ID do esporte',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Column()
  sportId: string;

  @ApiProperty({
    description: 'ID do criador da partida',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Column()
  creatorId: string;

  @ApiProperty({
    description: 'Título da partida',
    example: 'Futebol no Parque',
  })
  @Column()
  title: string;

  @ApiProperty({
    description: 'Descrição da partida',
    example: 'Partida de futebol amigável',
  })
  @Column()
  description: string;

  @ApiProperty({
    description: 'Local da partida',
    example: '{"city": "Sinop", "state": "MT", "fullAddress": "Rua Benedito Américo, Jardim Itália", "country": "Brasil", "cep": "78555321"}',
    oneOf: [
      { type: 'string' },
      { 
        type: 'object',
        properties: {
          city: { type: 'string' },
          state: { type: 'string' },
          fullAddress: { type: 'string' },
          country: { type: 'string' },
          cep: { type: 'string' }
        }
      }
    ]
  })
  @Column('text')
  location: string;

  @ApiProperty({
    description: 'Data e hora da partida',
    example: '2024-03-20T10:00:00Z',
  })
  @Column()
  date: Date;

  @ApiProperty({
    description: 'Número máximo de participantes',
    example: 22,
  })
  @Column()
  maxParticipants: number;

  @ApiProperty({
    description: 'Status da partida',
    example: 'SCHEDULED',
    enum: ['SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'],
  })
  @Column({
    type: 'simple-enum',
    enum: ['SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'],
    default: 'SCHEDULED',
  })
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

  @ApiProperty({
    description: 'Data de criação',
    example: '2024-03-19T10:00:00Z',
  })
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiProperty({
    description: 'Data de atualização',
    example: '2024-03-19T10:00:00Z',
  })
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ApiProperty({
    description: 'Esporte da partida',
    type: () => Sport,
  })
  @ManyToOne(() => Sport)
  @JoinColumn({ name: 'sportId' })
  sport: Sport;

  @ApiProperty({
    description: 'Criador da partida',
    type: () => User,
  })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'creatorId' })
  creator: User;

  @ApiProperty({
    description: 'Participantes da partida',
    type: () => [Participant],
  })
  @OneToMany(() => Participant, participant => participant.match)
  participants: Participant[];
} 