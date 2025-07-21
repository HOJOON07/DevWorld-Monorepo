import { create } from 'zustand';

interface EditorMethods {
  getValue: () => any;
}

interface EditorStore {
  editorMethods: EditorMethods | null;

  setEditorMethods: (methods: EditorMethods) => void;
  clearEditorMethods: () => void;
}

export const useEditorStore = create<EditorStore>((set) => ({
  editorMethods: null,

  setEditorMethods: (methods) => {
    set({ editorMethods: methods });
  },

  clearEditorMethods: () => {
    set({ editorMethods: null });
  },
}));
