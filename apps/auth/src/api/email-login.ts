import { APIBuilder } from '@devworld/axios-client';
import { SignInType } from '../lib/form-validation';

export interface EmailLoginResponse {
  status: number;
  message: 'Email Login Sucess';
  accessToken: string;
  refreshToken: string;
}

type EmailLoginRequest = SignInType;

export const AuthEmailLogin = async ({
  email,
  password,
}: EmailLoginRequest): Promise<EmailLoginResponse> => {
  const base64EmailPassword = btoa(`${email}:${password}`);

  const api = APIBuilder.post('/auth/login/email', {})
    .headers({
      authorization: `Basic ${base64EmailPassword}`,
    })
    .withCredentials(true)
    .build();
  const response = await api.call<EmailLoginResponse>();
  return response.data;
};
