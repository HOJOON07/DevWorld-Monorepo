import {
  CardContent,
  Form,
  FormField,
  FormItem,
  FormLabel,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@devworld/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useEmailVerifyCode } from '../../api/query-hooks/use-email-verify-code';
import { VerificationCodeSchema, VerificationCodeType } from '../../lib/form-validation';
import { useFunnel } from '../common/Funnel';
import ResendButton from './ResendButton';
import StepBackButton from './StepBackButton';
import VerifyButton from './VerifyButton';

const VerificationCodeLength = 6;

export default function SignUpEmailVerifyForm() {
  const { mutate: emailVerifyMutation, isPending: isVerifying } = useEmailVerifyCode();
  const { data: funnelData, nextStep } = useFunnel();

  const form = useForm<VerificationCodeType>({
    resolver: zodResolver(VerificationCodeSchema),
    defaultValues: {
      verificationCode: '',
    },
  });

  const otpSlots = useMemo(
    () =>
      Array.from({ length: VerificationCodeLength }).map((_, i) => (
        <InputOTPSlot index={i} key={i} />
      )),
    [],
  );

  const onSubmit = useCallback(
    async (values: VerificationCodeType) => {
      if (!funnelData.email) return;

      emailVerifyMutation(
        {
          email: funnelData.email,
          verificationCode: values.verificationCode,
        },
        {
          onSuccess: () => {
            nextStep();
          },
        },
      );
    },
    [emailVerifyMutation, funnelData.email],
  );

  return (
    <CardContent className='space-y-6'>
      <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
        <Form {...form}>
          <FormField
            control={form.control}
            name='verificationCode'
            render={({ field }) => (
              <FormItem className='space-y-3'>
                <FormLabel className='text-center block'>Enter Verification Code</FormLabel>
                <div className='flex justify-center'>
                  <InputOTP
                    maxLength={6}
                    disabled={isVerifying}
                    {...field}
                    className='flex justify-center'
                  >
                    <InputOTPGroup>{otpSlots}</InputOTPGroup>
                  </InputOTP>
                </div>
              </FormItem>
            )}
          />
          <div className='space-y-3'>
            <VerifyButton isVerifying={isVerifying} />
            <div className='flex space-x-2'>
              <StepBackButton isVerifying={isVerifying} />
              <ResendButton isVerifying={isVerifying} />
            </div>
          </div>
        </Form>
      </form>

      <div className='text-center space-y-2'>
        <p className='text-xs text-muted-foreground'>
          Didn't receive the code? Check your spam folder or try resending.
        </p>
        <p className='text-xs text-muted-foreground'>
          Need help?{' '}
          <a href='#' className='text-primary hover:underline'>
            Contact support
          </a>
        </p>
      </div>
    </CardContent>
  );
}
