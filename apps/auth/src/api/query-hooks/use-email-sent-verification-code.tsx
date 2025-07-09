import { useMutation } from '@devworld/tanstack-query-client';
import { useToast } from '@devworld/ui';
import {
  EmailSentVerificationCode,
  EmailSentVerificationCodeRequest,
} from '../email-sent-verification-code';

export const useEmailSentVerificationCode = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: EmailSentVerificationCodeRequest) => {
      return await EmailSentVerificationCode(data);
    },
    onSuccess: (email) => {
      toast({
        variant: 'default',
        title: 'Verification Code Sent',
        description: `We've sent a verification code to ${email}`,
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Failed to Send Code',
        description: 'Please check your email address and try again.',
      });
    },
  });
};
