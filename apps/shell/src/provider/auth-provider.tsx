import { BroadcastChannelEventBus } from '@devworld/event-bus';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { isAuthFetch } from '../api/is-auth-fetch';

const AuthContext = createContext<{ isAuthenticated: boolean }>({ isAuthenticated: false });

export const useAuth = () => useContext(AuthContext);

const authEventBus = new BroadcastChannelEventBus<'auth-channel'>('auth-channel');

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const fetchAndSetAuth = async () => {
      const result = await isAuthFetch();
      setIsAuthenticated(result);
    };
    fetchAndSetAuth();
  }, []);

  useEffect(() => {
    const handler = (isAuthenticated: boolean) => setIsAuthenticated(isAuthenticated);
    authEventBus.on('auth-change', handler);
    return () => authEventBus.off('auth-change', handler);
  }, [isAuthenticated]);

  return <AuthContext.Provider value={{ isAuthenticated }}>{children}</AuthContext.Provider>;
};
