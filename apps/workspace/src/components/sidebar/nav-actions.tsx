import { Button, Save } from '@devworld/ui';
import { useLocation } from 'react-router-dom';
import { getToday } from '../../lib/get-today';
import PublishDialog from '../publish-dialog/Dialog';

export function NavActions() {
  const { pathname } = useLocation();

  const today = getToday();

  if (pathname !== '/write') {
    return null;
  }

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
