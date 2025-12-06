import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Get all registered users from localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
    
    // Default demo users
    const defaultUsers: Record<string, User> = {
      'john.doe@example.com': { id: '1', email: 'john.doe@example.com', firstName: 'John', lastName: 'Doe', role: 'JOB_SEEKER' },
      'employer@company.com': { id: '2', email: 'employer@company.com', firstName: 'Jane', lastName: 'Smith', role: 'EMPLOYER' },
      'admin@revjobs.com': { id: '3', email: 'admin@revjobs.com', firstName: 'Admin', lastName: 'User', role: 'ADMIN' },
    };
    
    // Combine default users with registered users
    const allUsers = { ...defaultUsers, ...registeredUsers };
    
    const user = allUsers[email];
    if (user && (password === 'password123' || password === user.password)) {
      localStorage.setItem('token', 'mock-jwt-token');
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
    } else {
      throw new Error('Invalid email or password');
    }
  };

  const register = async (userData: any) => {
    // Get existing registered users
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
    
    // Check if user already exists
    if (registeredUsers[userData.email]) {
      throw new Error('User with this email already exists');
    }
    
    // Create new user
    const newUser: User & { password: string } = {
      id: Date.now().toString(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role: userData.role as 'JOB_SEEKER' | 'EMPLOYER' | 'ADMIN',
      password: userData.password
    };
    
    // Save to registered users
    registeredUsers[userData.email] = newUser;
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    
    // Don't auto-login after registration
    console.log('User registered successfully:', newUser.email);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};