import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  currentUser: User | null;
  loginWithGoogle: (customName?: string) => Promise<User>;
  switchUser: (userId: string) => void;
  logout: () => void;
  updateCurrentUser: (data: Partial<User>) => void;
  isLoginModalOpen: boolean;
  setLoginModalOpen: (open: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'pears_auth_current_user_id';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  useEffect(() => {
    api.initDatabase();
    const savedUserId = localStorage.getItem(AUTH_STORAGE_KEY);
    if (savedUserId) {
      const user = api.getUserById(savedUserId);
      if (user) {
        setCurrentUser(user);
      } else {
        // Default to Maya Lin
        const defaultUser = api.getUsers()[0];
        setCurrentUser(defaultUser);
        localStorage.setItem(AUTH_STORAGE_KEY, defaultUser.UserID);
      }
    } else {
      // Default auto sign-in to Maya Lin so the user can immediately experience the MVP
      const defaultUser = api.getUsers()[0];
      if (defaultUser) {
        setCurrentUser(defaultUser);
        localStorage.setItem(AUTH_STORAGE_KEY, defaultUser.UserID);
      }
    }
  }, []);

  const loginWithGoogle = async (customName?: string): Promise<User> => {
    const name = customName || 'Google Creator';
    const username = name.toLowerCase().replace(/[^a-z0-9]/g, '') + Math.floor(Math.random() * 1000);
    const newUser: User = {
      UserID: `usr_${Date.now()}`,
      GoogleID: `google_${Date.now()}`,
      Name: name,
      Username: username,
      Avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
      Bio: 'Just joined Pears via Google OAuth! 🍐 ✨',
      JoinedAt: new Date().toISOString()
    };

    const saved = api.saveUser(newUser);
    setCurrentUser(saved);
    localStorage.setItem(AUTH_STORAGE_KEY, saved.UserID);
    setLoginModalOpen(false);
    return saved;
  };

  const switchUser = (userId: string) => {
    const target = api.getUserById(userId);
    if (target) {
      setCurrentUser(target);
      localStorage.setItem(AUTH_STORAGE_KEY, target.UserID);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const updateCurrentUser = (data: Partial<User>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...data };
    api.saveUser(updated);
    setCurrentUser(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loginWithGoogle,
        switchUser,
        logout,
        updateCurrentUser,
        isLoginModalOpen,
        setLoginModalOpen
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
