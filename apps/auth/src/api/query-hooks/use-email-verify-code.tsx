import { useMutation } from '@devworld/tanstack-query-client';
import { useToast } from '@devworld/ui';
import { EmailVerifyCode, EmailVerifyCodeRequest } from '../email-verify-code';

export const useEmailVerifyCode = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: EmailVerifyCodeRequest) => {
      return await EmailVerifyCode(data);
    },
    onSuccess: () => {
      toast({
        variant: 'default',
        title: 'Email Verification Success',
        description: 'Email Verification Success',
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Failed to Email Verification',
        description: 'Please Check Your Email And Try Again.',
      });
    },
  });
};
