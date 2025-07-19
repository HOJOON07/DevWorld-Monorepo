import { Check, FormItem, FormLabel, Input, Mail } from '@devworld/ui';
import { type UseFormReturn } from 'react-hook-form';
import { SignUpType } from '../../../lib/form-validation';

interface EmailInputProps {
  form: UseFormReturn<SignUpType & { _isUsernameChecked?: boolean }>;
}

export default function EmailInput({ form }: EmailInputProps) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <FormItem>
      <FormLabel className='font-medium text-sm'>Email Address</FormLabel>
      <div className='relative'>
        <Mail className='absolute top-3 left-3 h-4 w-4 text-muted-foreground' />
        <Input
          {...register('email')}
          type='email'
          className='cursor-not-allowed border-muted bg-muted/50 pr-10 pl-10'
          disabled
          readOnly
        />
        <div className='absolute top-3 right-3'>
          <Check className='h-4 w-4 text-green-500' />
        </div>
      </div>
      {errors.email && <p className='text-red-500 text-xs'>{errors.email.message}</p>}
      <p className='flex items-center text-muted-foreground text-xs'>
        <Check className='mr-1 h-3 w-3 text-green-500' />
        Email verified successfully
      </p>
    </FormItem>
  );
}
