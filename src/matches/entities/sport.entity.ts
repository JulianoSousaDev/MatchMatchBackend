import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Sport {
  @ApiProperty({
    description: 'ID único do esporte',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Nome do esporte',
    example: 'Futebol',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'Número mínimo de jogadores',
    example: 2,
  })
  @Column()
  minPlayers: number;

  @ApiProperty({
    description: 'Número máximo de jogadores',
    example: 22,
  })
  @Column()
  maxPlayers: number;

  @ApiProperty({
    description: 'Pontuação mínima',
    example: 0,
  })
  @Column()
  minScore: number;

  @ApiProperty({
    description: 'Pontuação máxima',
    example: 100,
  })
  @Column()
  maxScore: number;

  @ApiProperty({
    description: 'Tipos de superfície',
    example: ['Grama', 'Sintético', 'Quadra'],
    type: [String],
  })
  @Column('simple-array')
  floorType: string[];

  @ApiProperty({
    description: 'Estilo de pontuação/jogo',
    example: 'Competitivo',
    required: false,
  })
  @Column({ nullable: true })
  matchStyle: string;
} 