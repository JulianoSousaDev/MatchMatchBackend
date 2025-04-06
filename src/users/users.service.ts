import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async create(email: string, password: string): Promise<User> {
    const user = new User();
    user.email = email;
    user.password = password;
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

  async updateAccessToken(userId: number, token: string): Promise<void> {
    await this.usersRepository.update(userId, { accessToken: token });
  }
} 