import axios from 'axios';
import { BASE_URL } from './config';

const REFRESH_TIMEOUT_MS = 5000;

export const rotateAccessToken = async () => {
  const response = await axios.post(
    `${BASE_URL}/auth/token/access`,
    {},
    { withCredentials: true, timeout: REFRESH_TIMEOUT_MS },
  );
  return response.data;
};
