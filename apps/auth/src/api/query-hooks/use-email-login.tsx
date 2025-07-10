import { useMutation } from '@devworld/tanstack-query-client';
import { useToast } from '@devworld/ui';
import { useNavigate } from 'react-router-dom';
import { SignInType } from '../../lib/form-validation';
import { AuthEmailLogin } from '../email-login';

export const useEmailLogin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
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
      // navigate('feed', { replace: true });
      window.dispatchEvent(new CustomEvent('global:navigate', { detail: '/feed' }));
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
