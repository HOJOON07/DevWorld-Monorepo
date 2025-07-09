import { Check, FormItem, FormLabel, Input, Mail } from '@devworld/ui';
import { type UseFormReturn } from 'react-hook-form';
import { SignUpType } from '../../../lib/form-validation';

interface EmailInputProps {
  form: UseFormReturn<SignUpType & { _isUsernameChecked?: boolean }>;
}

export default function EmailInput({ form }: EmailInputProps) {
  const {
    register,
    watch,
    formState: { errors },
  } = form;

  return (
    <FormItem>
      <FormLabel className='text-sm font-medium'>Email Address</FormLabel>
      <div className='relative'>
        <Mail className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
        <Input
          {...register('email')}
          type='email'
          className='pl-10 pr-10 bg-muted/50 cursor-not-allowed border-muted'
          disabled
          readOnly
        />
        <div className='absolute right-3 top-3'>
          <Check className='h-4 w-4 text-green-500' />
        </div>
      </div>
      {errors.email && <p className='text-xs text-red-500'>{errors.email.message}</p>}
      <p className='text-xs text-muted-foreground flex items-center'>
        <Check className='w-3 h-3 mr-1 text-green-500' />
        Email verified successfully
      </p>
    </FormItem>
  );
}
