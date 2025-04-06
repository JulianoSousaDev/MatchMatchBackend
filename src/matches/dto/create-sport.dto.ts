import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsArray } from 'class-validator';

export class CreateSportDto {
  @ApiProperty({
    description: 'Nome do esporte',
    example: 'Futebol',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Número mínimo de jogadores',
    example: 2,
  })
  @IsNotEmpty()
  @IsNumber()
  minPlayers: number;

  @ApiProperty({
    description: 'Número máximo de jogadores',
    example: 22,
  })
  @IsNotEmpty()
  @IsNumber()
  maxPlayers: number;

  @ApiProperty({
    description: 'Pontuação mínima',
    example: 0,
  })
  @IsNotEmpty()
  @IsNumber()
  minScore: number;

  @ApiProperty({
    description: 'Pontuação máxima',
    example: 100,
  })
  @IsNotEmpty()
  @IsNumber()
  maxScore: number;

  @ApiProperty({
    description: 'Tipos de superfície',
    example: ['Grama', 'Sintético', 'Quadra'],
    type: [String],
  })
  @IsNotEmpty()
  @IsArray()
  floorType: string[];
} 