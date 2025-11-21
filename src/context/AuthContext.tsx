import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

import { storage } from '@/lib/storage';
import { authService } from '@/services/authService';
import type { IAuthCredentials, IAuthUser } from '@/types';

type AuthContextValue = {
  user: IAuthUser | null;
  loading: boolean;
  signIn: (payload: IAuthCredentials) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IAuthUser | null>(null);
  const [loading, setLoading] = useState(false);

  const signIn = useCallback(async (payload: IAuthCredentials) => {
    setLoading(true);
    try {
      const result = await authService.login(payload);
      setUser(result.user);
      await storage.secure.setString('auth_token', result.token);
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
      await storage.secure.delete('auth_token');
      await storage.clearAll();
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      signIn,
      signOut,
    }),
    [loading, signIn, signOut, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
};

