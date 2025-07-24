import { create } from 'zustand';

export type SidebarMode = 'Preview' | 'My Profile';

interface SidePanelState {
  activeMode: SidebarMode;
  selectedArticleId: string | null;
}

interface SidePanelActions {
  setActiveMode: (mode: SidebarMode) => void;
  setSelectedArticle: (articleId: string) => void;
  clearSelection: () => void;
}

export const useSidePanelStore = create<SidePanelState & SidePanelActions>((set) => ({
  // State
  activeMode: 'Preview',
  selectedArticleId: null,

  // Actions
  setActiveMode: (mode) => set({ activeMode: mode }),

  setSelectedArticle: (articleId) =>
    set({
      selectedArticleId: articleId,
      activeMode: 'Preview',
    }),

  clearSelection: () =>
    set({
      selectedArticleId: null,
    }),
}));
