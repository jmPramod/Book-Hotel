export interface ProfileImage {
  imageUrl: string;
  imgPublicId: string | null;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  state: string;
  country: string;
  pinCode: number;
  email: string;
  isAdmin: "admin" | "user";
  profileImage: ProfileImage;
  createdAt: string;
  updatedAt: string;
}
