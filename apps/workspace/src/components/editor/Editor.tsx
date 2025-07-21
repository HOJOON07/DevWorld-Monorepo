import { useEditableEditor } from '@devworld/editor';

export default function Editor() {
  const { Editor, getValue } = useEditableEditor(Placeholder);

  return <Editor className='min-w-0 overflow-hidden px-20' />;
}

const Placeholder = [
  {
    children: [{ text: 'Title' }],
    type: 'h1',
  },
  {
    children: [{ text: '' }],
    type: 'hr',
  },
];
