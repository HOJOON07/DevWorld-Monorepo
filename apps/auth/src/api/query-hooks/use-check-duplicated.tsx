import { useMutation } from '@devworld/tanstack-query-client';
import { useToast } from '@devworld/ui';
import { CheckDuplicatedCheckRequest, checkDuplicatedName } from '../check-duplicated-name';

export const useCheckDuplicated = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ devName }: CheckDuplicatedCheckRequest) => {
      return await checkDuplicatedName({ devName });
    },
    onSuccess: () => {
      toast({
        variant: 'default',
        title: 'Check Duplicated DevWorld Name',
        description: 'You can use this DevWorld name.',
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Check Duplicated DevWorld Name',
        description: 'Sorry, this DevWorld name is already in use.',
      });
    },
  });
};
