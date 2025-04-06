import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber } from 'class-validator';

export class CreateParticipantDto {
  @ApiProperty({
    description: 'Pontuação do participante',
    example: 10,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  score?: number;
} 