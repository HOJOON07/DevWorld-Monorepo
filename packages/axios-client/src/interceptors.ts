import axios, { AxiosInstance } from 'axios';
import { BASE_URL } from './config';

export const rotateAccessToken = async () => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/token/access`,
      {},
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const rotateRefreshToken = async () => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/token/refresh`,
      {},
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const setupAuthInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalConfig = error.config;

      if (error.response && error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          await rotateAccessToken();
          return instance(originalConfig);
        } catch (err) {
          console.log(err, 'Rotate AccessToken Failed');
          try {
            await rotateRefreshToken();
            await rotateAccessToken();
            return instance(originalConfig);
          } catch (finalError) {
            return Promise.reject(finalError);
          }
        }
      }

      return Promise.reject(error);
    },
  );
};
