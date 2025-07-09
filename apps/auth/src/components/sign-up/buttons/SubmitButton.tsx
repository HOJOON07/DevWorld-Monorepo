import { ArrowRight, Button, Loader2 } from '@devworld/ui';
import { UseFormReturn, useFormState } from 'react-hook-form';
import { SignUpType } from '../../../lib/form-validation';

interface SubmitButtonProps {
  form: UseFormReturn<SignUpType & { _isUsernameChecked?: boolean }>;
}

export default function SubmitButton({ form }: SubmitButtonProps) {
  const {
    watch,
    formState: { isSubmitting, isValid },
  } = form;

  const isUsernameChecked = watch('_isUsernameChecked') || false;

  const isDisabled = isSubmitting || !isValid || !isUsernameChecked;

  const getButtonText = () => {
    if (isSubmitting) return 'Creating Account...';
    if (!isUsernameChecked) return 'Please check username availability';
    return 'Create DevWorld Account';
  };

  return (
    <Button type='submit' className='w-full h-11' disabled={isDisabled}>
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
