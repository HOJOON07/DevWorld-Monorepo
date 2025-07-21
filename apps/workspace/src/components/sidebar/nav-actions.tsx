import { Button, Printer, Save, Star } from '@devworld/ui';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getToday } from '../../lib/get-today';
import { useEditorStore } from '../../stores/editor-store';
import PublishDialog from '../publish-dialog/Dialog';

export function NavActions() {
  const { pathname } = useLocation();
  const { editorMethods } = useEditorStore();
  const [isPublishing, setIsPublishing] = useState(false);

  const today = getToday();

  if (pathname !== '/write') {
    return null;
  }

  const handlePublish = async () => {
    if (!editorMethods) {
      console.warn('Editor methods not available');
      return;
    }

    setIsPublishing(true);

    try {
      const value = editorMethods.getValue();
      console.log('Publishing content:', value);

      await new Promise((resolve) => setTimeout(resolve, 1000)); // 임시 딜레이

      console.log('Published successfully!');
    } catch (error) {
      console.error('Publish failed:', error);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className='flex items-center gap-2 text-sm'>
      <div className='hidden font-medium text-muted-foreground md:inline-block'>Edit {today}</div>
      <PublishDialog>
        <Button variant='ghost' size='icon' className='h-7 w-7'>
          <Save />
        </Button>
      </PublishDialog>
    </div>
  );
}
