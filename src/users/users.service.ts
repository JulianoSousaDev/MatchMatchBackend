import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async create(email: string, password: string, fullName: string): Promise<User> {
    const user = new User();
    user.email = email;
    user.password = password;
    user.fullName = fullName;
    
    return this.usersRepository.save(user);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.findOne(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async updateAccessToken(userId: string, token: string): Promise<void> {
    await this.usersRepository.update(userId, { accessToken: token });
  }

  async updateUserProfile(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.usersRepository.update(userId, updateUserDto);
    return this.findById(userId);
  }

  async getUserProfile(userId: string): Promise<any> {
    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    const { password, accessToken, ...profile } = user;
    return profile;
  }
} 