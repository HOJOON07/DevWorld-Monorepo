import { APIBuilder } from '@devworld/axios-client';
import { SignUpType } from '../lib/form-validation';

type EmailRegisterRequest = SignUpType;

export interface EmailRegisterResponse {
  accessToken: string;
  refreshToken: string;
}

export const emailRegister = async (data: EmailRegisterRequest): Promise<EmailRegisterResponse> => {
  const api = APIBuilder.post('/auth/register/email', data).withCredentials(false).build();

  const response = await api.call<EmailRegisterResponse>();
  return response.data;
};
