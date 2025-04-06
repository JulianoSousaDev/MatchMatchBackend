import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { FavoriteSport } from './entities/favorite-sport.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { FavoriteSportResponseDto } from './dto/favorite-sport.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(FavoriteSport)
    private favoriteSportsRepository: Repository<FavoriteSport>,
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
    await this.usersRepository.update(userId, { accessToken: token } as Partial<User>);
  }

  async updateUserProfile(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    const { favoriteSports, ...userDataToUpdate } = updateUserDto;
    
    await this.usersRepository.update(userId, userDataToUpdate as Partial<User>);
    return this.findById(userId);
  }

  async getUserProfile(userId: string): Promise<any> {
    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    
    const { password, ...profile } = user;
    
    const favoriteSports = await this.getFavoriteSports(userId);
    const simpleFavoriteSports = favoriteSports.map(fs => fs.sportName);
    
    return { ...profile, favoriteSports: simpleFavoriteSports };
  }

  async getFavoriteSports(userId: string): Promise<FavoriteSportResponseDto[]> {
    const favorites = await this.favoriteSportsRepository.find({
      where: { userId },
      relations: ['sport'],
    });

    return favorites.map(favorite => ({
      id: favorite.id,
      sportId: favorite.sportId,
      sportName: favorite.sport.name,
      createdAt: favorite.createdAt,
    }));
  }

  async addFavoriteSport(userId: string, sportId: string): Promise<FavoriteSportResponseDto> {
    // Limpar possíveis caracteres extras no sportId
    const cleanSportId = sportId.trim();
    
    // Verificar se o esporte existe
    const sportRepository = this.favoriteSportsRepository.manager.getRepository('sport');
    const sportExists = await sportRepository.findOne({ where: { id: cleanSportId } });
    
    if (!sportExists) {
      throw new NotFoundException(`Esporte com ID ${cleanSportId} não encontrado`);
    }
    
    // Verificar se já é favorito
    const existingFavorite = await this.favoriteSportsRepository.findOne({
      where: { userId, sportId: cleanSportId },
    });

    if (existingFavorite) {
      throw new BadRequestException('Este esporte já está na lista de favoritos');
    }

    // Adicionar aos favoritos
    const favoriteSport = this.favoriteSportsRepository.create({
      userId,
      sportId: cleanSportId,
    });

    const savedFavorite = await this.favoriteSportsRepository.save(favoriteSport);
    
    // Buscar detalhes do esporte para a resposta
    const favoriteWithSport = await this.favoriteSportsRepository.findOne({
      where: { id: savedFavorite.id },
      relations: ['sport'],
    });

    return {
      id: favoriteWithSport.id,
      sportId: favoriteWithSport.sportId,
      sportName: favoriteWithSport.sport.name,
      createdAt: favoriteWithSport.createdAt,
    };
  }

  async removeFavoriteSport(userId: string, favoriteId: string): Promise<void> {
    const favorite = await this.favoriteSportsRepository.findOne({
      where: { id: favoriteId, userId },
    });

    if (!favorite) {
      throw new NotFoundException('Esporte favorito não encontrado');
    }

    await this.favoriteSportsRepository.remove(favorite);
  }
} 