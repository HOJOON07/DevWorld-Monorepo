import { BookText } from '@devworld/ui';
import { useNavigate } from 'react-router-dom';
import { formatISODate } from '../../lib/format-iso-date';
import { useBreadcrumbStore } from '../../stores/breadcrumb-store';

export interface DocsItemProps {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}

type NavigateDocType = Pick<DocsItemProps, 'id' | 'title'>;

export function DocsTableItem({ id, title, createdAt, updatedAt }: DocsItemProps) {
  const navigate = useNavigate();
  const { setRoute } = useBreadcrumbStore();

  const handleClick = (doc: NavigateDocType) => {
    const { id, title } = doc;
    console.log('DocsTableItem: handleClick called with', { id, title });
    console.log('DocsTableItem: calling setRoute with title:', title);
    setRoute(title);
    console.log('DocsTableItem: calling navigate to:', `/write/${id}`);
    navigate(`/write/${id}`);
  };

  return (
    <div
      className='flex h-16 cursor-pointer items-center border-border/50 border-b px-4 hover:bg-accent hover:text-accent-foreground'
      onClick={() => handleClick({ id, title })}
    >
      <div className='flex flex-1 items-center gap-3'>
        <BookText strokeWidth={1} className='text-muted-foreground' size={16} />
        <span className='truncate font-medium'>{title}</span>
      </div>

      <div className='flex w-[15%] items-center justify-center'>
        <span className='text-muted-foreground text-xs'>{formatISODate(createdAt)}</span>
      </div>

      <div className='flex w-[15%] items-center justify-center'>
        <span className='text-muted-foreground text-xs'>{formatISODate(updatedAt)}</span>
      </div>
    </div>
  );
}
