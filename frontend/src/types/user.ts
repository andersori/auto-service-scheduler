export interface UserRegistration {
  name: string;
  email: string;
  phone: string;
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