import { BaseEditorKit, createSlateEditor, EditorContainer, EditorStatic } from '@devworld/editor';

interface Props {
  contents: any;
}

export default function StaticEditor({ contents }: Props) {
  const editor = createSlateEditor({
    plugins: BaseEditorKit,
    value: contents,
  });
  return (
    <EditorStatic
      editor={editor}
      variant='none'
      className='[&_code]:whitespace-pre-wrap [&_pre]:overflow-x-auto'
    />
  );
}
