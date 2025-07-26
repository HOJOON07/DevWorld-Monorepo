import { APIBuilder } from '@devworld/axios-client';
import { ProfileEditType } from '../lib/profile-edit-schema';

export interface EditProfileRequest {
  userId: number;
  profileEditData: ProfileEditType;
}

export type EditProfieResponse = ProfileEditType;

export const EditProfile = async ({
  userId,
  profileEditData,
}: EditProfileRequest): Promise<EditProfieResponse> => {
  const api = APIBuilder.patch(`/users/edit/${userId}`, profileEditData)
    .withCredentials(true)
    .build();
  const { data } = await api.call<EditProfieResponse>();
  return data;
};
