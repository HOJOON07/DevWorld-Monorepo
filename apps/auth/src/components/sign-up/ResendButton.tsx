import { Button, cn, RefreshCw } from '@devworld/ui';
import { useEffect, useMemo, useState } from 'react';
import { useEmailSentVerificationCode } from '../../api/query-hooks/use-email-sent-verification-code';
import { useCountdownTimer } from '../../hooks/useCountdownTimer';
import { useFunnel } from '../common/Funnel';

type ResendButtonState = 'ready' | 'waiting' | 'resending';

interface ResendButtonProps {
  isVerifying: boolean;
}

const initialCountdown = 5;

export default function ResendButton({ isVerifying }: ResendButtonProps) {
  const { data } = useFunnel();

  const [internalState, setInternalState] = useState<ResendButtonState>('waiting');
  const { countdown, resetCountdown } = useCountdownTimer(initialCountdown);
  const emailSentMutation = useEmailSentVerificationCode();

  useEffect(() => {
    if (emailSentMutation.isPending) {
      setInternalState('resending');
    } else if (isVerifying) {
      setInternalState('waiting');
    } else if (countdown <= 0) {
      setInternalState('ready');
    } else {
      setInternalState('waiting');
    }
  }, [emailSentMutation.isPending, isVerifying, countdown]);

  const handleResend = () => {
    if (internalState === 'ready' && data.email) {
      emailSentMutation.mutate({ email: data.email });
      resetCountdown();
    }
  };

  const buttonText = useMemo(() => {
    switch (internalState) {
      case 'resending':
        return 'Sending...';
      case 'waiting':
        return countdown > 0 ? `Resend (${countdown}s)` : 'Resend';
      case 'ready':
        return 'Resend';
      default:
        return 'Resend';
    }
  }, [internalState, countdown]);

  const isDisabled = useMemo(() => {
    return internalState !== 'ready';
  }, [internalState]);

  return (
    <Button
      type='button'
      variant='outline'
      className='flex-1 bg-transparent'
      disabled={isDisabled}
      onClick={handleResend}
    >
      <RefreshCw
        className={cn('mr-2 h-4 w-4', {
          'animate-spin': internalState === 'resending',
        })}
      />
      {buttonText}
    </Button>
  );
}
