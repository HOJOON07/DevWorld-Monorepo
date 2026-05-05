import { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { rotateAccessToken } from './auth-api';

declare module 'axios' {
  export interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

const AUTH_ENDPOINT_PATTERNS = ['/auth/login', '/auth/register', '/auth/token', '/auth/oauth'];

const isAuthEndpoint = (url?: string) =>
  !!url && AUTH_ENDPOINT_PATTERNS.some((pattern) => url.includes(pattern));

let refreshPromise: Promise<void> | null = null;

const ensureRefresh = (): Promise<void> => {
  if (!refreshPromise) {
    refreshPromise = rotateAccessToken()
      .then(() => undefined)
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
};

export type AuthFailureHandler = () => void;

let authFailureHandler: AuthFailureHandler | null = null;

export const setAuthFailureHandler = (handler: AuthFailureHandler | null) => {
  authFailureHandler = handler;
};

const shouldAttemptRefresh = (config: InternalAxiosRequestConfig | undefined) =>
  !!config &&
  config.withCredentials === true &&
  !config._retry &&
  !isAuthEndpoint(config.url);

export const setupAuthInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.response.use(undefined, async (error: AxiosError) => {
    const originalConfig = error.config as InternalAxiosRequestConfig | undefined;

    if (error.response?.status !== 401 || !shouldAttemptRefresh(originalConfig)) {
      return Promise.reject(error);
    }

    originalConfig!._retry = true;

    try {
      await ensureRefresh();
      return instance(originalConfig!);
    } catch (refreshError) {
      authFailureHandler?.();
      return Promise.reject(refreshError);
    }
  });
};
