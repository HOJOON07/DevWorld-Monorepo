import {
  AlertCircle,
  Button,
  Check,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Loader2,
  User,
} from '@devworld/ui';
import { useCallback, useEffect, useState } from 'react';
import { type UseFormReturn } from 'react-hook-form';
import { useCheckDuplicated } from '../../../api/query-hooks/use-check-duplicated';
import { SignUpType } from '../../../lib/form-validation';

interface UsernameInputProps {
  form: UseFormReturn<SignUpType & { _isUsernameChecked?: boolean }>;
}

type UserNameCheckStatus = 'idle' | 'available' | 'taken';

export default function UsernameInput({ form }: UsernameInputProps) {
  const { control, setError, clearErrors, setValue, watch } = form;
  const disabled = false;
  const [usernameCheckStatus, setUsernameCheckStatus] = useState<UserNameCheckStatus>('idle');

  const checkDuplicatedMutation = useCheckDuplicated();

  // 현재 devName 값 구독
  const currentDevName = watch('devName');

  const checkUsernameAvailability = useCallback(
    async (username: string) => {
      if (username.length < 3) return;

      setUsernameCheckStatus('idle');
      clearErrors('devName');

      try {
        await checkDuplicatedMutation.mutateAsync({ devName: username });
        setUsernameCheckStatus('available');
        setValue('_isUsernameChecked', true); // form context에 상태 저장
      } catch (error) {
        setUsernameCheckStatus('taken');
        setValue('_isUsernameChecked', false); // form context에 상태 저장
        setError('devName', {
          type: 'manual',
          message: 'Username is already taken',
        });
      }
    },
    [checkDuplicatedMutation, setError, clearErrors, setValue],
  );

  // devName 값 변경 시 체크 상태 초기화
  useEffect(() => {
    setValue('_isUsernameChecked', false);
    setUsernameCheckStatus('idle');
  }, [currentDevName, setValue]);

  const getUsernameStatusIcon = () => {
    if (checkDuplicatedMutation.isPending) {
      return <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />;
    }

    switch (usernameCheckStatus) {
      case 'available':
        return <Check className='h-4 w-4 text-green-500' />;
      case 'taken':
        return <AlertCircle className='h-4 w-4 text-red-500' />;
      default:
        return null;
    }
  };

  return (
    <FormField
      control={control}
      name='devName'
      render={({ field }) => (
        <FormItem>
          <FormLabel className='font-medium text-sm'>DevWorld Username</FormLabel>
          <div className='flex space-x-2'>
            <div className='relative flex-1'>
              <User className='absolute top-3 left-3 h-4 w-4 text-muted-foreground' />
              <Input
                {...field}
                type='text'
                placeholder='Choose your unique username'
                className={`pr-10 pl-10 ${
                  usernameCheckStatus === 'available' ? 'border-green-500' : ''
                }`}
                disabled={disabled}
              />
              <div className='absolute top-3 right-3'>{getUsernameStatusIcon()}</div>
            </div>
            <Button
              type='button'
              variant='outline'
              onClick={() => checkUsernameAvailability(field.value)}
              disabled={
                checkDuplicatedMutation.isPending ||
                !field.value.trim() ||
                field.value.length < 3 ||
                disabled
              }
              className='whitespace-nowrap bg-transparent px-4'
            >
              {checkDuplicatedMutation.isPending ? (
                <>
                  <Loader2 className='mr-1 h-4 w-4 animate-spin' />
                  Checking
                </>
              ) : (
                'Check'
              )}
            </Button>
          </div>
          <FormMessage />
          {usernameCheckStatus === 'available' && (
            <p className='flex items-center text-green-600 text-xs'>
              <Check className='mr-1 h-3 w-3' />
              Username is available!
            </p>
          )}
          <p className='text-muted-foreground text-xs'>
            3-20 characters, letters, numbers, and underscores only
          </p>
        </FormItem>
      )}
    />
  );
}
