import { Check, FormField, FormItem, FormLabel, Input, Mail } from '@devworld/ui';
import { useFormContext } from 'react-hook-form';
import { SignUpType } from '../../../lib/form-validation';

export default function EmailInput() {
  const { control } = useFormContext<SignUpType>();

  return (
    <FormField
      control={control}
      name='email'
      render={({ field }) => (
        <FormItem>
          <FormLabel className='text-sm font-medium'>Email Address</FormLabel>
          <div className='relative'>
            <Mail className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
            <Input
              {...field}
              type='email'
              className='pl-10 pr-10 bg-muted/50 cursor-not-allowed border-muted'
              disabled
              readOnly
            />
            <div className='absolute right-3 top-3'>
              <Check className='h-4 w-4 text-green-500' />
            </div>
          </div>
          <p className='text-xs text-muted-foreground flex items-center'>
            <Check className='w-3 h-3 mr-1 text-green-500' />
            Email verified successfully
          </p>
        </FormItem>
      )}
    />
  );
}
