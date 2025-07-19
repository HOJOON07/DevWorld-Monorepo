import type { TElement } from 'platejs';
import { Plate, useEditorRef, usePlateEditor } from 'platejs/react';
import type React from 'react';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { EditorKit, type MyEditor } from '../components/editor/editor-kit';
import { Editor, EditorContainer } from '../components/ui/editor';

const EditorAPI = forwardRef<MyEditor>((props, ref) => {
  const editor = useEditorRef<MyEditor>();

  useImperativeHandle(ref, () => editor, [editor]);
  return null;
});

EditorAPI.displayName = 'EditorAPI';

interface UseEditableEditorReturn {
  component: React.ReactElement;
  children: TElement[] | undefined;
  api: MyEditor['api'] | undefined;
  tf: MyEditor['tf'] | undefined;
  selection: MyEditor['selection'] | undefined;
  operations: MyEditor['operations'] | undefined;
  getValue: () => TElement[] | undefined;
  setValue: (value: TElement[]) => void;
}

export function useEditableEditor(initialValue?: TElement[]): UseEditableEditorReturn {
  const plateEditor = usePlateEditor({
    plugins: EditorKit,
    value: initialValue,
  });
  const apiRef = useRef<MyEditor | null>(null);

  const component = (
    <Plate editor={plateEditor}>
      <EditorContainer>
        <Editor variant='default' />
      </EditorContainer>
      <EditorAPI ref={apiRef} />
    </Plate>
  );

  return {
    component,
    get children() {
      return apiRef.current?.children;
    },
    get api() {
      return apiRef.current?.api;
    },
    get tf() {
      return apiRef.current?.tf;
    },
    get selection() {
      return apiRef.current?.selection;
    },
    get operations() {
      return apiRef.current?.operations;
    },
    getValue: () => apiRef.current?.children,
    setValue: (value: TElement[]) => apiRef.current?.tf?.setValue?.(value),
  };
}
