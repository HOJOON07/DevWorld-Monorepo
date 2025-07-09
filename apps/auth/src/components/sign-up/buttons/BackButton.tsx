import { ArrowLeft, Button } from '@devworld/ui';
import { useCallback } from 'react';
import { UseFormReturn, useFormState } from 'react-hook-form';
import { SignUpType } from '../../../lib/form-validation';
import { useFunnel } from '../../common/Funnel';

interface BackButtonProps {
  form: UseFormReturn<SignUpType & { _isUsernameChecked?: boolean }>;
}

export default function BackButton({ form }: BackButtonProps) {
  const { setStep } = useFunnel();
  const {
    formState: { isSubmitting },
  } = form;

  const handleBack = useCallback(() => {
    setStep(2);
  }, [setStep]);

  return (
    <Button
      type='button'
      variant='outline'
      className='w-full bg-transparent'
      onClick={handleBack}
      disabled={isSubmitting}
    >
      <ArrowLeft className='mr-2 h-4 w-4' />
      Back
    </Button>
  );
}
