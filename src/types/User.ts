// src/types/User.ts

export interface ProfileImage {
  imageUrl: string;
  imgPublicId: string | null;
  _id: string;
}

export interface UserData {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  address?: string;
  state?: string;
  country?: string;
  pinCode?: number;
  email: string;
  isAdmin: string;
  profileImage: ProfileImage;
  createdAt: string;
  updatedAt: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  data: UserData;
  tokens: Tokens;
}
