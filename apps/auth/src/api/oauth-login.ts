import { APIBuilder } from '@devworld/axios-client';
import { OAuthProvider } from './get-redirect-url';

export interface OAuthLoginRequest {
  code: string;
}

export interface OAuthLoginResponse {
  status: number;
  message: string;
  accessToken: string;
  refreshToken: string;
}

export const oauthLogin = async (
  provider: OAuthProvider,
  code: string,
): Promise<OAuthLoginResponse> => {
  const api = APIBuilder.post(`/auth/oauth-login/${provider}`, { code })
    .withCredentials(true)
    .build();

  const response = await api.call<OAuthLoginResponse>();
  return response.data;
};
