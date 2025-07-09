import { APIBuilder } from '@devworld/axios-client';

export interface EmailVerifyCodeRequest {
  email: string;
  verificationCode: string;
}

export interface EmailVerifyCodeResponse {
  email: string;
  verificationCode: string;
}

export const EmailVerifyCode = async ({
  email,
  verificationCode,
}: EmailVerifyCodeRequest): Promise<EmailVerifyCodeResponse> => {
  const api = APIBuilder.post('/mail/verify', { email, verificationCode })
    .withCredentials(false)
    .build();

  const response = await api.call<EmailVerifyCodeResponse>();

  return response.data;
};
