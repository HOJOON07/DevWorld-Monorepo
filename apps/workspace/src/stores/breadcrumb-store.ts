import { create } from 'zustand';

interface State {
  route: string;
}

interface Action {
  setRoute: (route: string) => void;
  clearRoute: () => void;
}

export const useBreadcrumbStore = create<State & Action>((set) => ({
  route: '',
  setRoute: (route: string) => {
    set({ route });
  },
  clearRoute: () => set({ route: '' }),
}));
