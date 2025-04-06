import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class AddFavoriteSportDto {
  @ApiProperty({
    description: 'ID do esporte',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsUUID()
  sportId: string;
}

export class FavoriteSportResponseDto {
  @ApiProperty({
    description: 'ID único da relação',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'ID do esporte',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  sportId: string;

  @ApiProperty({
    description: 'Nome do esporte',
    example: 'Futebol',
  })
  sportName: string;

  @ApiProperty({
    description: 'Data de adição aos favoritos',
    example: '2024-03-19T10:00:00Z',
  })
  createdAt: Date;
} 