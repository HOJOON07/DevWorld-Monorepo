import { Bookmark, Button } from '@devworld/ui';
import { useState } from 'react';

export default function BookmarkButton() {
  const [isBookmarked, setIsBookmarked] = useState(false);
  return (
    <div className='flex items-center gap-1'>
      <Button
        variant='ghost'
        size='sm'
        className={`h-7 w-7 rounded-full p-0 hover:bg-yellow-50 ${
          isBookmarked
            ? 'text-yellow-600 hover:text-yellow-700'
            : 'text-gray-600 hover:text-yellow-600'
        }`}
        onClick={() => setIsBookmarked(!isBookmarked)}
      >
        <Bookmark className={`h-3.5 w-3.5 ${isBookmarked ? 'fill-current' : ''}`} />{' '}
      </Button>
    </div>
  );
}
