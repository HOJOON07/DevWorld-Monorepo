import { useCallback, useEffect, useState } from 'react';

type InitialCountdown = number;

interface UseCountdownTimerReturn {
  countdown: number;
  resetCountdown: () => void;
}

export function useCountdownTimer(initialCountdown: InitialCountdown): UseCountdownTimerReturn {
  const [countdown, setCountdown] = useState(initialCountdown);

  useEffect(() => {
    if (countdown <= 0) return;

    let startTime: number;
    let animationId: number;

    const updateCountdown = (timestamp: number) => {
      if (!startTime) startTime = timestamp;

      const elapsed = timestamp - startTime;

      if (elapsed >= 1000) {
        setCountdown((prev) => Math.max(0, prev - 1));
        startTime = timestamp;
      }

      if (countdown > 0) {
        animationId = requestAnimationFrame(updateCountdown);
      }
    };

    animationId = requestAnimationFrame(updateCountdown);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [countdown]);

  const resetCountdown = useCallback(() => {
    setCountdown(initialCountdown);
  }, [initialCountdown]);

  return {
    countdown,
    resetCountdown,
  };
}
