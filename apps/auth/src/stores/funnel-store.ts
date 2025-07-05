import { create } from 'zustand';

interface AuthFunnelState {
  step: number;
  email: string;
  isLoading: boolean;
  error: string | null;
}

interface AuthFunnelActions {
  setStep: (step: number) => void;
  nextStep: () => void;
  setEmail: (email: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export type AuthFunnelStore = AuthFunnelState & AuthFunnelActions;

export const createAuthFunnelStore = () =>
  create<AuthFunnelStore>((set, get) => ({
    step: 1,
    email: '',
    isLoading: false,
    error: null,

    setStep: (step) => set({ step, error: null }),

    nextStep: () => {
      const { step } = get();
      if (step < 3) {
        set({ step: step + 1, error: null });
      }
    },

    setEmail: (email) => set({ email }),

    setLoading: (isLoading) => set({ isLoading }),

    setError: (error) => set({ error }),

    reset: () => set({ step: 1, email: '', isLoading: false, error: null }),
  }));
