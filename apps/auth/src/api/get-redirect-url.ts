import { APIBuilder } from '@devworld/axios-client';

export type OAuthProvider = 'google' | 'github';

export interface RedirectUrlResponse {
  provider: string;
  redirectUrl: string;
}

export const getRedirectUrl = async (provider: OAuthProvider): Promise<RedirectUrlResponse> => {
  const api = APIBuilder.get(`/auth/callback/${provider}`).withCredentials(false).build();

  const response = await api.call<RedirectUrlResponse>();
  return response.data;
};
