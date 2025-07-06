import { create } from 'zustand';

interface FunnelState<T = any> {
  step: number;
  data: T;
  isLoading: boolean;
  error: string | null;
}

interface FunnelActions<T> {
  setStep: (step: number) => void;
  nextStep: (maxStep?: number) => void;
  setData: (data: Partial<T>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: (initialData: T) => void;
}

export type FunnelStore<T> = FunnelState<T> & FunnelActions<T>;

export const createFunnelStore = <T>(initialData: T) =>
  create<FunnelStore<T>>((set, get) => ({
    step: 1,
    data: initialData,
    isLoading: false,
    error: null,

    setStep: (step) => set({ step, error: null }),

    nextStep: (maxStep = 3) => {
      const { step } = get();
      if (step < maxStep) {
        set({ step: step + 1, error: null });
      }
    },

    setData: (newData) =>
      set((state) => ({
        data: { ...state.data, ...newData },
      })),

    setLoading: (isLoading) => set({ isLoading }),

    setError: (error) => set({ error }),

    reset: (initialData) => set({ step: 1, data: initialData, isLoading: false, error: null }),
  }));
