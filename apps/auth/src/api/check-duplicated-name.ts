import { APIBuilder } from '@devworld/axios-client';
import { SignUpType } from '../lib/form-validation';

export type CheckDuplicatedCheckRequest = Pick<SignUpType, 'devName'>;

export interface CheckDuplicatedCheckResponse {
  message: string;
}

export const checkDuplicatedName = async ({
  devName,
}: CheckDuplicatedCheckRequest): Promise<CheckDuplicatedCheckResponse> => {
  const api = APIBuilder.post('/auth/check/devname', { devName }).withCredentials(false).build();

  const response = await api.call<CheckDuplicatedCheckResponse>();
  return response.data;
};
