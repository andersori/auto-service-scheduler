export interface UserRegistration {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: UserResponse;
  message: string;
}

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  phone: string;
  userType: 'ADMIN' | 'CUSTOMER' | 'WORKSHOP';
  createdAt: string;
}

export type UserType = 'ADMIN' | 'CUSTOMER' | 'WORKSHOP';