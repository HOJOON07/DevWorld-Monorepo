import { Bookmark, Button, Card, CardContent, CardHeader, Eye } from '@devworld/ui';
import { useState } from 'react';
import BookmarkButton from './BookmarkButton';
import CommentButton from './CommentButton';
import LikeButton from './LikeButton';
import ShareButton from './ShareButton';
import UserProfileHover from './UserProfileHover';

interface FeedCardProps {
  data: {
    id: string;
    title: string;
    description: string;
    author: {
      name: string;
      avatar: string;
      title: string;
      isVerified: boolean;
    };
    stats: {
      likes: number;
      comments: number;
      shares: number;
      views: number;
    };
    timestamp: string;
  };
}

export default function FeedCard({ data }: FeedCardProps) {
  return (
    <Card className='gap-4 overflow-hidden rounded-xl border-0 bg-gradient-to-br from-white to-gray-50/30 py-4 shadow-sm transition-all duration-300 hover:shadow-md'>
      <CardHeader className='px-4'>
        <div className='flex items-start justify-between'>
          <div className='flex items-start'>
            <UserProfileHover user={data.author} />
          </div>
          <BookmarkButton />
        </div>
      </CardHeader>

      <CardContent className='px-4'>
        <div className='space-y-3'>
          <div className='prose prose-xs max-w-none'>
            <h3 className='mb-1 font-semibold text-gray-900 text-sm'>{data.title}</h3>
            <p className='text-gray-800 text-sm leading-relaxed'>{data.description}</p>
            <button
              onClick={() => {}} // 비활성화된 상태
              className='mt-1.5 font-medium text-blue-600 text-xs transition-colors duration-200 hover:text-blue-700 hover:underline'
            >
              Read more
            </button>
          </div>

          <div className='mt-3 flex items-center justify-between border-gray-100 border-t pt-3 text-gray-600 text-xs'>
            <div className='flex items-center gap-3'>
              <div className='flex items-center gap-0.5'>
                <Eye className='h-3.5 w-3.5' />
                <span>{data.stats.views} views</span>
              </div>
              <LikeButton initialLikes={data.stats.likes} postId={data.id} />
              <CommentButton initialCount={data.stats.comments} postId={data.id} />
            </div>
            <ShareButton initialCount={data.stats.shares} postId={data.id} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
