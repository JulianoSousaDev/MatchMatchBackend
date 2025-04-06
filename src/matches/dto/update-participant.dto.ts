import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsEnum } from 'class-validator';

export class UpdateParticipantDto {
  @ApiProperty({
    description: 'Status do participante',
    example: 'CONFIRMED',
    enum: ['PENDING', 'CONFIRMED', 'CANCELLED'],
    required: false,
  })
  @IsOptional()
  @IsEnum(['PENDING', 'CONFIRMED', 'CANCELLED'])
  status?: 'PENDING' | 'CONFIRMED' | 'CANCELLED';

  @ApiProperty({
    description: 'Pontuação do participante',
    example: 10,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  score?: number;
} 