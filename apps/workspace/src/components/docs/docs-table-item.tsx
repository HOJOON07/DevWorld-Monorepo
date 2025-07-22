import { BookText } from '@devworld/ui';

export interface DocsItemProps {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export function DocsTableItem({ id, title, createdAt, updatedAt }: DocsItemProps) {
  return (
    <div className='flex h-16 cursor-pointer items-center border-border/50 border-b px-4 hover:bg-accent hover:text-accent-foreground'>
      <div className='flex flex-1 items-center gap-3'>
        <BookText strokeWidth={1} className='text-muted-foreground' size={16} />
        <span className='truncate font-medium'>{title}</span>
      </div>

      <div className='flex w-[15%] items-center justify-center'>
        <span className='text-muted-foreground text-xs'>{createdAt}</span>
      </div>

      <div className='flex w-[15%] items-center justify-center'>
        <span className='text-muted-foreground text-xs'>{updatedAt}</span>
      </div>
    </div>
  );
}
