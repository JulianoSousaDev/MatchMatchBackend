import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum, IsOptional, IsNumber, IsUUID, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMatchDto {
  @ApiProperty({
    description: 'Título da partida',
    example: 'Futebol no Parque',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Descrição da partida',
    example: 'Partida amistosa de futebol no Parque Villa-Lobos',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Local da partida',
    example: 'Parque Ibirapuera',
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
  @IsNotEmpty()
  location: any;

  @ApiProperty({
    description: 'Data e hora da partida',
    example: '2024-04-20T14:00:00Z',
  })
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  date: Date;

  @ApiProperty({
    description: 'ID do esporte',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsUUID()
  sportId: string;

  @ApiProperty({
    description: 'Número máximo de participantes',
    example: 22,
    default: 10,
  })
  @IsOptional()
  @IsNumber()
  maxParticipants?: number;
} 