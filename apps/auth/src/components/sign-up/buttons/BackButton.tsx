import { ArrowLeft, Button } from '@devworld/ui';
import { useCallback } from 'react';
import { useFormState } from 'react-hook-form';
import { useFunnel } from '../../common/Funnel';

interface BackButtonProps {
  className?: string;
}

export default function BackButton({ className }: BackButtonProps) {
  const { setStep } = useFunnel();
  const { isSubmitting } = useFormState();

  const handleBack = useCallback(() => {
    setStep(2);
  }, [setStep]);

  return (
    <Button
      type='button'
      variant='outline'
      className={`w-full bg-transparent ${className || ''}`}
      onClick={handleBack}
      disabled={isSubmitting}
    >
      <ArrowLeft className='mr-2 h-4 w-4' />
      Back
    </Button>
  );
}
