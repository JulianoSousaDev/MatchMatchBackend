import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty({
    description: 'ID único do usuário',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

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