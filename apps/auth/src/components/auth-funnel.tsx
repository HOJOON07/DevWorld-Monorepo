import { createContext, ReactNode, useContext, useRef } from 'react';
import { useStore } from 'zustand';
import { createAuthFunnelStore } from '../stores/funnel-store';

const AuthFunnelContext = createContext<ReturnType<typeof createAuthFunnelStore> | null>(null);

export function useAuthFunnel() {
  const store = useContext(AuthFunnelContext);
  if (!store) {
    throw new Error('useAuthFunnel must be used within AuthFunnel');
  }
  return useStore(store);
}

interface AuthFunnelProps {
  children: ReactNode;
}

function AuthFunnelRoot({ children }: AuthFunnelProps) {
  const authFunnelStore = useRef(createAuthFunnelStore());

  return (
    <AuthFunnelContext.Provider value={authFunnelStore.current}>
      {children}
    </AuthFunnelContext.Provider>
  );
}

interface StepProps {
  step: number;
  children: ReactNode;
}

function AuthFunnelStep({ step, children }: StepProps) {
  const { step: currentStep } = useAuthFunnel();

  if (currentStep !== step) return null;

  return <>{children}</>;
}

// Compound Component
export const AuthFunnel = Object.assign(AuthFunnelRoot, {
  Step: AuthFunnelStep,
});
