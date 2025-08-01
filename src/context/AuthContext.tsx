import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User } from '../types';
import { apiService } from '../services/apiService';
import { useNotification } from './NotificationContext';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean; // For initial auth state check
  actionLoading: boolean; // For login/register button states
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Initial auth check loading
  const [actionLoading, setActionLoading] = useState(false); // Login/Register action loading
  const { addNotification } = useNotification();

  useEffect(() => {
    // Check for user in localStorage on initial load
    try {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      setUser(null);
    } finally {
      setLoading(false); // Finished initial check
    }
  }, []);

  useEffect(() => {
    // Persist user to localStorage whenever it changes
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    setActionLoading(true);
    try {
      const userData = await apiService.login(email, password);
      setUser(userData);
      addNotification('Logged in successfully!', 'success');
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to login';
      addNotification(errorMessage, 'error');
      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setActionLoading(true);
    try {
      const userData = await apiService.register(name, email, password);
      setUser(userData);
      addNotification('Account created successfully!', 'success');
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to register';
      addNotification(errorMessage, 'error');
      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    addNotification('Logged out successfully.', 'info');
  };

  const contextValue: AuthContextType = {
    isAuthenticated: !!user,
    user,
    login,
    register,
    logout,
    loading,
    actionLoading,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};