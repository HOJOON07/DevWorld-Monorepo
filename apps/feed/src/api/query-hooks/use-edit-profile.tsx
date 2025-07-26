import { useMutation, useQueryClient } from '@devworld/tanstack-query-client';
import { useToast } from '@devworld/ui';
import { EditProfile, EditProfileRequest } from '../edit-profile';

export const useEditProfile = () => {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, profileEditData }: EditProfileRequest) =>
      EditProfile({
        userId,
        profileEditData,
      }),
    onSuccess: () => {
      toast({
        variant: 'default',
        title: 'Profied Edit Toast',
        description: 'Your Profile Edit Success',
      });
      queryClient.invalidateQueries();
    },
  });
};
