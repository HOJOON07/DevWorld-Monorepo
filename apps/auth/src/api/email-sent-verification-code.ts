import { APIBuilder } from '@devworld/axios-client';

export interface EmailSentVerificationCodeRequest {
  email: string;
}

export interface EmailSentVerificationCodeResponse {
  email: string;
}

export const EmailSentVerificationCode = async ({
  email,
}: EmailSentVerificationCodeRequest): Promise<EmailSentVerificationCodeResponse> => {
  const api = APIBuilder.post('/mail/send', { email }).withCredentials(false).build();

  const response = await api.call<EmailSentVerificationCodeResponse>();

  return response.data;
};
