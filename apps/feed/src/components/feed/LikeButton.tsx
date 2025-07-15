import { Heart } from '@devworld/ui';
import { useState } from 'react';

interface LikeButtonProps {
  postId: string;
  initialLikes: number;
}

export default function LikeButton({ postId, initialLikes }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));

    // TODO: API 호출 로직 추가
    console.log(`Like ${isLiked ? 'removed' : 'added'} for post ${postId}`);
  };

  return (
    <button
      onClick={handleLike}
      className={`group flex cursor-pointer items-center gap-0.5 ${
        isLiked ? 'text-red-600' : 'text-gray-600'
      } transition-colors hover:text-red-600`}
    >
      <Heart className={`h-3.5 w-3.5 ${isLiked ? 'fill-current' : ''}`} />
      <span>{likeCount} likes</span>
    </button>
  );
}
