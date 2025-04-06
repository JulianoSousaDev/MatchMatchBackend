import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FavoriteSport } from './entities/favorite-sport.entity';
import { UsersService } from './users.service'
import { UsersController } from './users.controller'

@Module({
  imports: [TypeOrmModule.forFeature([User, FavoriteSport])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {} 