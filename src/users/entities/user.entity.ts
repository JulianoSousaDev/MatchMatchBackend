import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty({
    description: 'ID único do usuário',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'usuario@exemplo.com',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'João Silva',
  })
  @Column()
  fullName: string;

  @ApiProperty({
    description: 'Senha do usuário (hash)',
    example: '********',
  })
  @Column()
  password: string;

  @ApiProperty({
    description: 'Pontos do usuário',
    example: 100,
  })
  @Column({ default: 0 })
  points: number;

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
} 