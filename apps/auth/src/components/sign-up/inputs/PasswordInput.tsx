import {
  Check,
  Eye,
  EyeOff,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Lock,
} from '@devworld/ui';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface PasswordInputProps {
  disabled?: boolean;
}

export default function PasswordInput({ disabled = false }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const { control, watch } = useFormContext();

  const watchedValues = watch();

  return (
    <>
      <FormField
        control={control}
        name='password'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-sm font-medium'>Password</FormLabel>
            <div className='relative'>
              <Lock className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
              <Input
                {...field}
                type={showPassword ? 'text' : 'password'}
                placeholder='Create a strong password'
                className='pl-10 pr-10'
                disabled={disabled}
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors'
                disabled={disabled}
              >
                {showPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
              </button>
            </div>
            <FormMessage />
            <p className='text-xs text-muted-foreground'>
              At least 8 characters with uppercase, lowercase, and number
            </p>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name='passwordConfirm'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-sm font-medium'>Confirm Password</FormLabel>
            <div className='relative'>
              <Lock className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
              <Input
                {...field}
                type={showPasswordConfirm ? 'text' : 'password'}
                placeholder='Confirm your password'
                className={`pl-10 pr-10 ${
                  field.value && watchedValues.password === field.value ? 'border-green-500' : ''
                }`}
                disabled={disabled}
              />
              <button
                type='button'
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                className='absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors'
                disabled={disabled}
              >
                {showPasswordConfirm ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
              </button>
            </div>
            <FormMessage />
            {field.value && watchedValues.password === field.value && (
              <p className='text-xs text-green-600 flex items-center'>
                <Check className='w-3 h-3 mr-1' />
                Passwords match
              </p>
            )}
          </FormItem>
        )}
      />
    </>
  );
}
