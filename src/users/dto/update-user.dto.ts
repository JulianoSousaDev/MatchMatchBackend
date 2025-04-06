import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsArray, Min, Max } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'João Silva',
    required: false,
  })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiProperty({
    description: 'URL da foto de perfil do usuário',
    example: 'https://exemplo.com/fotos/perfil.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  profileImageUrl?: string;

  @ApiProperty({
    description: 'Idade do usuário',
    example: 25,
    required: false,
    minimum: 13,
    maximum: 120,
  })
  @IsOptional()
  @IsNumber()
  @Min(13)
  @Max(120)
  age?: number;

  @ApiProperty({
    description: 'Cidade do usuário',
    example: 'São Paulo',
    required: false,
  })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({
    description: 'Lista de esportes favoritos do usuário',
    example: ['Futebol', 'Vôlei', 'Natação'],
    required: false,
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  favoriteSports?: string[];

  @ApiProperty({
    description: 'Pontuação do usuário',
    example: 650,
    required: false,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  points?: number;
} 