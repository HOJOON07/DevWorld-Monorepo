import { useEditorRef } from 'platejs/react';
export default function Value() {
  const editor = useEditorRef();

  console.log(editor.children);
  return <div></div>;
}
