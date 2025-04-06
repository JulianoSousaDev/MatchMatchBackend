import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum } from 'class-validator';

export class UpdateParticipantStatusDto {
  @ApiProperty({
    description: 'Status do convite',
    example: 'CONFIRMED',
    enum: ['PENDING', 'CONFIRMED', 'REFUSED'],
  })
  @IsNotEmpty()
  @IsEnum(['PENDING', 'CONFIRMED', 'REFUSED'])
  status: 'PENDING' | 'CONFIRMED' | 'REFUSED';
} 