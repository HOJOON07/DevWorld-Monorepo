import { APIBuilder } from '@devworld/axios-client';

export const isAuthFetch = async (): Promise<boolean> => {
  try {
    const api = APIBuilder.get('/auth/isAuth').withCredentials(true).build();
    await api.call();
    return true;
  } catch (err) {
    return false;
  }
};
