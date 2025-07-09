import { ArrowLeft, Button } from '@devworld/ui';
import { useCallback } from 'react';
import { useFunnel } from '../common/Funnel';

interface StepBackButtonProps {
  isVerifying: boolean;
}

export default function StepBackButton({ isVerifying }: StepBackButtonProps) {
  const { reset } = useFunnel();

  const handleBackClick = useCallback(() => {
    if (isVerifying) return;
    reset({});
  }, [isVerifying, reset]);

  return (
    <Button
      type='button'
      variant='outline'
      className='flex-1 bg-transparent'
      disabled={isVerifying}
      onClick={handleBackClick}
    >
      <ArrowLeft className='mr-2 h-4 w-4' />
      Back
    </Button>
  );
}
