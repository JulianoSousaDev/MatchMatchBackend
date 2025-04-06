import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    return this.usersService.validateUser(email, password);
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);
    
    // Atualiza o token de acesso do usuário no banco
    await this.usersService.updateAccessToken(user.id, token);
    
    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }

  async register(email: string, password: string) {
    const existingUser = await this.usersService.findOne(email);
    if (existingUser) {
      return { success: false, message: 'Usuário já existe' };
    }
    
    const user = await this.usersService.create(email, password);
    return { 
      success: true, 
      user: {
        id: user.id,
        email: user.email,
      }
    };
  }
} 