import { APIBuilder } from '@devworld/axios-client';

export enum RolesEnum {
  USER = 'user',
  ADMIN = 'admin',
}
export interface GetMyInfoResponse {
  id: string;
  email: string;
  password?: string;
  devName?: string;
  role: RolesEnum;
  position?: string;
  bio?: string;
  location?: string;
  github?: string;
  linkedin?: string;
  instagram?: string;
  socialEtc?: string;
  company?: string;
  readme?: string;
  followerCount: number;
  followeeCount: number;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const getMyInfo = async (): Promise<GetMyInfoResponse> => {
  const api = APIBuilder.get('/users/myinfo').withCredentials(true).build();

  const { data } = await api.call<GetMyInfoResponse>();

  return data;
};
