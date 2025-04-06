import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty({
    description: 'ID único do usuário (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'João Silva',
  })
  @Column({ nullable: true })
  fullName: string;

  @ApiProperty({
    description: 'URL da foto de perfil do usuário',
    example: 'https://exemplo.com/fotos/perfil.jpg',
    required: false,
  })
  @Column({ nullable: true })
  profileImageUrl: string;

  @ApiProperty({
    description: 'Idade do usuário',
    example: 25,
    required: false,
  })
  @Column({ nullable: true })
  age: number;

  @ApiProperty({
    description: 'Cidade do usuário',
    example: 'São Paulo',
    required: false,
  })
  @Column({ nullable: true })
  city: string;

  @ApiProperty({
    description: 'Lista de esportes favoritos do usuário',
    example: ['Futebol', 'Vôlei', 'Natação'],
    required: false,
    type: [String],
  })
  @Column('simple-array', { nullable: true })
  favoriteSports: string[];

  @ApiProperty({
    description: 'Pontuação do usuário',
    example: 500,
    default: 500,
  })
  @Column({ default: 500 })
  points: number;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'usuario@exemplo.com',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário (armazenada com hash)',
    example: '$2b$10$dP.d6CoDQsVIKQMEGtbiNuZR5zl8Fg1Uik',
  })
  @Column()
  password: string;

  @ApiProperty({
    description: 'ID do Google para autenticação com Google',
    example: '112389471734921',
    required: false,
  })
  @Column({ nullable: true })
  googleId: string;

  @ApiProperty({
    description: 'Token de acesso JWT',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    required: false,
  })
  @Column({ nullable: true })
  accessToken: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
} 