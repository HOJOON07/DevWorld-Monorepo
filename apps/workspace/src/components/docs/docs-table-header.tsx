import { List, Separator } from '@devworld/ui';

export function DocsTableHeader() {
  return (
    <div className='sticky top-0 border-b bg-background/95 backdrop-blur-sm'>
      <div className='flex h-12 items-center px-4 font-medium text-muted-foreground text-sm'>
        <div className='flex flex-1 items-center gap-3'>
          <List size={16} />
          <span>제목</span>
        </div>

        <div className='flex w-[15%] items-center justify-center'>
          <span>생성날짜</span>
        </div>
        <div className='h-5 w-1'>
          <Separator orientation='vertical' />
        </div>

        <div className='flex w-[15%] items-center justify-center'>
          <span>수정날짜</span>
        </div>
      </div>
    </div>
  );
}
