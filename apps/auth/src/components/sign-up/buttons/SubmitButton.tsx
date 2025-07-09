import { ArrowRight, Button, Loader2 } from '@devworld/ui';
import { useCallback } from 'react';
import { useFormContext, useFormState } from 'react-hook-form';
import { emailRegister } from '../../../api/email-register';
import { SignUpType } from '../../../lib/form-validation';
import { useFunnel } from '../../common/Funnel';

interface SubmitButtonProps {
  className?: string;
}

export default function SubmitButton({ className }: SubmitButtonProps) {
  const { setData } = useFunnel();
  const { isSubmitting, isValid } = useFormState();
  const { getValues, watch, setError } = useFormContext<
    SignUpType & { _isUsernameChecked?: boolean }
  >();

  const isUsernameChecked = watch('_isUsernameChecked') || false;

  const isDisabled = isSubmitting || !isValid || !isUsernameChecked;

  const getButtonText = () => {
    if (isSubmitting) return 'Creating Account...';
    if (!isUsernameChecked) return 'Please check username availability';
    return 'Create DevWorld Account';
  };

  return (
    <Button type='submit' className={`w-full h-11 ${className || ''}`} disabled={isDisabled}>
      {isSubmitting ? (
        <>
          <Loader2 className='w-4 h-4 mr-2 animate-spin' />
          Creating Account...
        </>
      ) : (
        <>
          {getButtonText()}
          {!isSubmitting && isUsernameChecked && <ArrowRight className='ml-2 h-4 w-4' />}
        </>
      )}
    </Button>
  );
}
