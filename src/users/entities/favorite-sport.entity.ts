import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';
import { Sport } from '../../matches/entities/sport.entity';

@Entity()
export class FavoriteSport {
  @ApiProperty({
    description: 'ID único da relação',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'ID do usuário',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Column()
  userId: string;

  @ApiProperty({
    description: 'ID do esporte',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Column()
  sportId: string;

  @ApiProperty({
    description: 'Data de adição aos favoritos',
    example: '2024-03-19T10:00:00Z',
  })
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Sport)
  @JoinColumn({ name: 'sportId' })
  sport: Sport;
} 