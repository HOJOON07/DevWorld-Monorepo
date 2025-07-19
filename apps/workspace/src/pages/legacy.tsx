// import type { TElement } from 'platejs';
// import { Plate, useEditorRef, usePlateEditor } from 'platejs/react';
// import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
// import { EditorKit, type MyEditor } from '../components/editor/editor-kit';
// import { Editor, EditorContainer } from '../components/ui/editor';

// interface EditorAPIProps {
//   onReady?: (editor: MyEditor) => void;
// }

// const EditorAPI = forwardRef<MyEditor, EditorAPIProps>(({ onReady }, ref) => {
//   const editor = useEditorRef<MyEditor>();

//   useImperativeHandle(ref, () => editor, [editor]);

//   React.useEffect(() => {
//     if (editor && onReady) {
//       onReady(editor);
//     }
//   }, [editor, onReady]);

//   return null;
// });

// EditorAPI.displayName = 'EditorAPI';

// interface UseEditableEditorReturn {
//   component: React.ReactElement;
//   isReady: boolean;
//   children: TElement[] | undefined;
//   api: MyEditor['api'] | undefined;
//   tf: MyEditor['tf'] | undefined;
//   selection: MyEditor['selection'] | undefined;
//   operations: MyEditor['operations'] | undefined;
//   getValue: () => TElement[] | undefined;
//   setValue: (value: TElement[]) => void;
// }

// export function useEditableEditor(initialValue?: TElement[]): UseEditableEditorReturn {
//   const plateEditor = usePlateEditor({
//     plugins: EditorKit,
//     value: initialValue,
//   });
//   const apiRef = useRef<MyEditor | null>(null);
//   const [isReady, setIsReady] = useState(false);

//   // 에디터가 준비되면 호출되는 콜백
//   const handleEditorReady = useCallback((editor: MyEditor) => {
//     setIsReady(true);
//   }, []);

//   const component = (
//     <Plate editor={plateEditor}>
//       <EditorContainer>
//         <Editor variant='default' />
//       </EditorContainer>
//       <EditorAPI ref={apiRef} onReady={handleEditorReady} />
//     </Plate>
//   );

//   return {
//     component,
//     isReady,
//     get children() {
//       return isReady ? apiRef.current?.children : initialValue;
//     },
//     get api() {
//       return apiRef.current?.api;
//     },
//     get tf() {
//       return apiRef.current?.tf;
//     },
//     get selection() {
//       return apiRef.current?.selection;
//     },
//     get operations() {
//       return apiRef.current?.operations;
//     },
//     // 타이밍 문제 해결: isReady 상태 확인 후 값 반환
//     getValue: () => (isReady ? apiRef.current?.children : initialValue),
//     setValue: (value: TElement[]) => {
//       if (isReady) {
//         apiRef.current?.tf?.setValue?.(value);
//       }
//     },
//   };
// }
