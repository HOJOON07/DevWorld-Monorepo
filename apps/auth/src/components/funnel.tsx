import { createContext, JSX, ReactNode, useContext, useRef } from 'react';
import { useStore } from 'zustand';
import { createFunnelStore, FunnelStore } from '../stores/funnel-store';

const FunnelContext = createContext<ReturnType<typeof createFunnelStore<any>> | null>(null);

export function useFunnel<T = any>() {
  const store = useContext(FunnelContext);
  if (!store) {
    throw new Error('useFunnel must be used within Funnel');
  }
  return useStore(store) as FunnelStore<T>;
}

interface FunnelProps<T> {
  children: ReactNode;
  initialData: T;
}

function FunnelRoot<T>({ children, initialData }: FunnelProps<T>) {
  const funnelStore = useRef(createFunnelStore<T>(initialData));

  return (
    <FunnelContext.Provider value={funnelStore.current as any}>{children}</FunnelContext.Provider>
  );
}

interface StepProps {
  step: number;
  children: ReactNode;
}

function FunnelStep({ step, children }: StepProps) {
  const { step: currentStep } = useFunnel();

  if (currentStep !== step) return null;

  return <>{children}</>;
}

interface FunnelComponent {
  <T>(props: FunnelProps<T>): JSX.Element;
  Step: typeof FunnelStep;
}

export const Funnel = FunnelRoot as FunnelComponent;
Funnel.Step = FunnelStep;
