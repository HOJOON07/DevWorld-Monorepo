import { useEditableEditor } from '@devworld/editor';
import { useEffect, useRef } from 'react';
import { useEditorStore } from '../stores/editor-store';

export default function Write() {
  const { Editor, getValue } = useEditableEditor(Placeholder);
  const { setEditorMethods, clearEditorMethods } = useEditorStore();

  const getValueRef = useRef(getValue);

  useEffect(() => {
    getValueRef.current = getValue;
  }, [getValue]);

  useEffect(() => {
    setEditorMethods({
      getValue: () => getValueRef.current(),
    });

    return () => {
      clearEditorMethods();
    };
  }, []);

  return (
    <div className='flex h-full flex-col'>
      <div className='flex-1 overflow-hidden'>
        <Editor className='min-w-0 overflow-hidden px-20' />
      </div>
    </div>
  );
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
