import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';

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
        fullName: user.fullName,
        points: user.points || 500
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const { email, password, fullName } = registerDto;
    
    const existingUser = await this.usersService.findOne(email);
    if (existingUser) {
      return { success: false, message: 'Usuário já existe' };
    }
    
    const user = await this.usersService.create(email, password, fullName);
    
    // Gerar token JWT
    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);
    
    // Atualiza o token de acesso do usuário no banco
    await this.usersService.updateAccessToken(user.id, token);
    
    return { 
      success: true,
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        points: user.points
      }
    };
  }
} 