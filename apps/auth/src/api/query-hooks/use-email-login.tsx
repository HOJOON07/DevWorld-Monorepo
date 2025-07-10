import { useMutation } from '@devworld/tanstack-query-client';
import { useToast } from '@devworld/ui';
import { SignInType } from '../../lib/form-validation';
import { globalNavigate } from '../../lib/global-navigate';
import { AuthEmailLogin } from '../email-login';

export const useEmailLogin = () => {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (credentials: SignInType) => {
      return await AuthEmailLogin(credentials);
    },
    onSuccess: () => {
      toast({
        variant: 'default',
        title: 'User Login Success',
        description: 'You have successfully logged in',
      });
      globalNavigate('/feed');
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'User Login Failed',
        description: 'Please try again or reset your password.',
      });
    },
  });
};
