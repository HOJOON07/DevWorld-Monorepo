import { Share2 } from '@devworld/ui';
import { useState } from 'react';

interface ShareButtonProps {
  postId: string;
  initialCount: number;
}

export default function ShareButton({ postId, initialCount }: ShareButtonProps) {
  const [shareCount, setShareCount] = useState(initialCount);

  const handleShare = () => {
    setShareCount((prev) => prev + 1);

    // TODO: 공유 기능 구현
    console.log(`Share clicked for post ${postId}`);
  };

  return (
    <button
      onClick={handleShare}
      className='group flex cursor-pointer items-center gap-0.5 text-gray-600 transition-colors hover:text-green-600'
    >
      <Share2 className='h-3.5 w-3.5' />
      <span>{shareCount} reposts</span>
    </button>
  );
}
