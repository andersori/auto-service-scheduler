import { UserRegistration, UserResponse, LoginData, LoginResponse } from '../types/user';
import httpRequestService from './httpRequestService';

const API_BASE_URL = 'http://localhost:8080/api/users';

export class UserService {
  static async registerUser(userRegistration: UserRegistration, language: string): Promise<UserResponse> {
    const response = await httpRequestService.post(
      `${API_BASE_URL}/register`,
      userRegistration,
      {
        'Content-Type': 'application/json',
        'Accept-Language': language
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      if (errorData.error && errorData.error.includes('Email')) {
        throw new Error('EMAIL_EXISTS');
      }
      throw new Error(errorData.error || 'Registration failed');
    }

    return response.json();
  }

  static async loginUser(loginData: LoginData, language: string): Promise<LoginResponse> {
    const response = await httpRequestService.post(
      `${API_BASE_URL}/login`,
      loginData,
      {
        'Content-Type': 'application/json',
        'Accept-Language': language
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      if (errorData.error && errorData.error.includes('inválidos')) {
        throw new Error('INVALID_CREDENTIALS');
      }
      throw new Error(errorData.error || 'Login failed');
    }

    return response.json();
  }

  static async getAllUsers(language: string): Promise<UserResponse[]> {
    const response = await httpRequestService.get(API_BASE_URL, {
      'Accept-Language': language
    });

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    return response.json();
  }

  static async getUserById(id: number, language: string): Promise<UserResponse> {
    const response = await httpRequestService.get(`${API_BASE_URL}/${id}`, {
      'Accept-Language': language
    });

    if (!response.ok) {
      throw new Error('User not found');
    }

    return response.json();
  }

  static async getUserByEmail(email: string, language: string): Promise<UserResponse> {
    const response = await httpRequestService.get(`${API_BASE_URL}/email/${encodeURIComponent(email)}`, {
      'Accept-Language': language
    });

    if (!response.ok) {
      throw new Error('User not found');
    }

    return response.json();
  }
}

export default UserService;