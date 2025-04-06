// Interface para resposta de autenticação (login)
export interface LoginResponse {
  access_token: string;
  user: User;
}

// Interface para resposta de registro
export interface RegisterResponse {
  success: boolean;
  access_token: string;
  user: User;
  message?: string;
}

// Interface resposta de participantes
interface Participant {
  invitationStatus: 'PENDING' | 'CONFIRMED' | 'REFUSED';
  user: User
}

// Interface para resposta de esportes (volei, futebol, basquete)
interface Sport {
  name: string;
  minPlayers: number;
  maxPlayer: number;
  minScore: number;
  maxScore: number;
  floorType: string[];
}

// Interface para resposta de partidas (matches)
interface Match {
  status: 'FINALIZED' | 'ACTIVE' | 'WAITING' | 'PENDING'
  title: string;
  description: string;
  cover: string;
  date: string;
  time: number;
  matchScore: number;
  matchStyle: string;
  sport: Sport;
  participants: {
    host: User;
    list: Participant[]
    limit: number;
  };
    location:{
    city: string;
    state: string;
    country: string;
    cep: string;
    fullAddress: string;
    complement?: string;
  };
}

// Interface para o usuário retornado pela API
export interface User {
  id: string;
  email: string;
  fullName: string;
  profileImageUrl?: string;
  age?: number;
  city?: string;
  favoriteSports?: string[];
  points?: number;
  googleId?: string;
  createdAt?: string;
  updatedAt?: string;
  location?:{
    city?: string;
    state?: string;
    country?: string;
    cep?: string;
    fullAddress?: string
  };
  planner?:{
    lastMatches: Array<Match>
    nextMatches?: Array<Match>
  }
}

// Interface para resposta de perfil detalhado
export interface DetailedProfileResponse {
  id: string;
  email: string;
  fullName: string;
  profileImageUrl?: string;
  age?: number;
  city?: string;
  favoriteSports?: string[];
  points?: number;
  googleId?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Interface para dados de atualização de perfil
export interface UpdateProfileData {
  fullName?: string;
  profileImageUrl?: string;
  age?: number;
  city?: string;
  favoriteSports?: string[];
}

// Interface para dados de registro
export interface RegisterData {
  email: string;
  password: string;
  fullName: string;
}

// Interface para dados de login
export interface LoginData {
  email: string;
  password: string;
}
