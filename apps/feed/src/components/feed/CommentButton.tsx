import { MessageCircle } from '@devworld/ui';

interface CommentButtonProps {
  postId: string;
  initialCount: number;
}

export default function CommentButton({ postId, initialCount }: CommentButtonProps) {
  const handleComment = () => {
    // TODO: 댓글 기능 구현
    console.log(`Comment clicked for post ${postId}`);
  };

  return (
    <button
      onClick={handleComment}
      className='group flex cursor-pointer items-center gap-0.5 text-gray-600 transition-colors hover:text-blue-600'
    >
      <MessageCircle className='h-3.5 w-3.5' />
      <span>{initialCount} comments</span>
    </button>
  );
}
