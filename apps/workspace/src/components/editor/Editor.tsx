import {
  Editor,
  EditorContainer,
  EditorKit,
  Plate,
  SettingsDialog,
  usePlateEditor,
} from '@devworld/editor';
export default function WorkspaceEditor({ value }: { value: any }) {
  const editor = usePlateEditor({
    plugins: EditorKit,
    value,
    autoSelect: 'end',
  });

  return (
    <Plate editor={editor}>
      <EditorContainer>
        <Editor variant='none' className='min-w-0 overflow-hidden px-20' />
      </EditorContainer>
      <SettingsDialog />
    </Plate>
  );
}
