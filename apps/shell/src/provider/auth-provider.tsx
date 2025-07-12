import { APIBuilder } from '@devworld/axios-client';
import { BroadcastChannelEventBus } from '@devworld/event-bus';
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext<{ isAuthenticated: boolean }>({ isAuthenticated: false });

export const useAuth = () => useContext(AuthContext);

const authEventBus = new BroadcastChannelEventBus<'auth-channel'>('auth-channel');

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  console.log('use Effect 외부', isAuthenticated);

  useEffect(() => {
    const isAuthFetch = async () => {
      try {
        console.log('auth api 실행');
        const api = APIBuilder.get('/auth/isAuth').withCredentials(true).build();
        const respone = await api.call();

        console.log(respone);
        console.log('use Effect 내부', isAuthenticated);
        setIsAuthenticated(true);
      } catch (err) {
        console.log('use Effect 내부', isAuthenticated);
        setIsAuthenticated(false);
      }
    };
    isAuthFetch();
  }, []);

  useEffect(() => {
    const handler = (isAuthenticated: boolean) => setIsAuthenticated(isAuthenticated);
    authEventBus.on('auth-change', handler);
    return () => authEventBus.off('auth-change', handler);
  }, []);

  return <AuthContext.Provider value={{ isAuthenticated }}>{children}</AuthContext.Provider>;
};
