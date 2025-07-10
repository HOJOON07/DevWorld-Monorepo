import { useMutation } from '@devworld/tanstack-query-client';
import { useToast } from '@devworld/ui';
import { SignUpType } from '../../lib/form-validation';
import { globalNavigate } from '../../lib/global-navigate';
import { emailRegister } from '../email-register';

export const useSignUp = () => {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (data: SignUpType) => {
      return await emailRegister(data);
    },
    onSuccess: () => {
      toast({
        variant: 'default',
        title: 'Sign Up Success',
        description: 'You have successfully signed up. Enjoy your journey with us!',
      });
      globalNavigate('/feed');
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Failed to Sign',
        description: 'Please check your email address and try again.',
      });
    },
  });
};
