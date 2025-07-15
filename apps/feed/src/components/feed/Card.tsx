'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Bookmark,
  Button,
  Card,
  CardContent,
  CardHeader,
  Eye,
  Heart,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  MessageCircle,
  Share2,
  TrendingUp,
} from '@devworld/ui';
import { useState } from 'react';

export default function FeedCard() {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(247);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <Card className='gap-4 overflow-hidden rounded-xl border-0 bg-gradient-to-br from-white to-gray-50/30 py-4 shadow-sm transition-all duration-300 hover:shadow-md'>
      <CardHeader className='px-4'>
        <div className='flex items-start justify-between'>
          <div className='flex items-start'>
            <HoverCard>
              <HoverCardTrigger asChild>
                <div className='flex w-full cursor-pointer items-start gap-3'>
                  <div className='relative'>
                    <Avatar className='h-10 w-10 ring-1 ring-blue-100'>
                      <AvatarImage src='/placeholder.svg?height=40&width=40' alt='Sarah Chen' />
                      <AvatarFallback className='bg-gradient-to-br from-blue-500 to-purple-600 font-semibold text-sm text-white'>
                        SC
                      </AvatarFallback>
                    </Avatar>
                    <div className='-bottom-0.5 -right-0.5 absolute h-3 w-3 rounded-full border border-white bg-green-500'></div>
                  </div>
                  <div className='min-w-0 flex-1'>
                    <div className='flex flex-wrap items-center gap-1.5'>
                      <h3 className='font-semibold text-gray-900 text-sm'>Sarah Chen</h3>
                      <Badge
                        variant='secondary'
                        className='bg-blue-50 px-1.5 py-0.5 text-blue-700 text-xs hover:bg-blue-100' // Slightly reduced padding
                      >
                        <TrendingUp className='mr-0.5 h-2.5 w-2.5' />
                        Top Voice
                      </Badge>
                    </div>
                    <p className='mt-0.5 text-muted-foreground text-xs'>
                      Senior Product Designer at Figma • 2nd
                    </p>
                  </div>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className='w-72 rounded-lg shadow-md'>
                <div className='flex items-center gap-3'>
                  <Avatar className='h-14 w-14 ring-1 ring-blue-100'>
                    <AvatarImage src='/placeholder.svg?height=56&width=56' alt='Sarah Chen' />
                    <AvatarFallback className='bg-gradient-to-br from-blue-500 to-purple-600 font-semibold text-lg text-white'>
                      SC
                    </AvatarFallback>
                  </Avatar>
                  <div className='flex-1'>
                    <h4 className='font-bold text-base text-gray-900'>Sarah Chen</h4>{' '}
                    {/* Reduced text size */}
                    <p className='text-gray-600 text-sm'>Senior Product Designer at Figma</p>
                    <p className='mt-0.5 text-gray-500 text-xs'>
                      Building intuitive and beautiful user experiences. Passionate about design
                      systems and accessibility.
                    </p>
                  </div>
                </div>
                <div className='mt-3 flex items-center justify-between'>
                  <div className='flex gap-3 text-gray-700 text-sm'>
                    <div>
                      <span className='font-semibold'>1.5K</span>{' '}
                      <span className='text-gray-500'>팔로워</span>
                    </div>
                    <div>
                      <span className='font-semibold'>500</span>{' '}
                      <span className='text-gray-500'>팔로잉</span>
                    </div>
                  </div>
                  <Button size='sm' className='rounded-full px-3 py-1.5 text-sm'>
                    팔로우
                  </Button>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
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
        </div>
      </CardHeader>

      <CardContent className='px-4'>
        <div className='space-y-3'>
          <div className='prose prose-xs max-w-none'>
            <p className='text-gray-800 leading-relaxed'>
              Just shipped a major redesign for our design system! 🎉 After 6 months of research,
              testing, and iteration, we've created something that's not just beautiful, but truly
              accessible and scalable.
            </p>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className='mt-1.5 font-medium text-blue-600 text-xs transition-colors duration-200 hover:text-blue-700 hover:underline' // Reduced text size, margin
            >
              {isExpanded ? 'Read less' : 'Read more'}
            </button>
          </div>

          <div className='mt-3 flex items-center justify-between border-gray-100 border-t pt-3 text-gray-600 text-xs'>
            <div className='flex items-center gap-3'>
              <div className='flex items-center gap-0.5'>
                <Eye className='h-3.5 w-3.5' />
                <span>1.2K views</span>
              </div>
              <button
                onClick={handleLike}
                className={`group flex cursor-pointer items-center gap-0.5 ${isLiked ? 'text-red-600' : 'text-gray-600'} transition-colors hover:text-red-600`} // Reduced gap
              >
                <Heart className={`h-3.5 w-3.5 ${isLiked ? 'fill-current' : ''}`} />{' '}
                <span>{likeCount} likes</span>
              </button>
              <button
                onClick={() => console.log('Comment clicked')}
                className='group flex cursor-pointer items-center gap-0.5 text-gray-600 transition-colors hover:text-blue-600' // Reduced gap
              >
                <MessageCircle className='h-3.5 w-3.5' />
                <span>34 comments</span>
              </button>
            </div>
            {/* Reposts count with Share2 icon */}
            <button
              onClick={() => console.log('Share clicked')} // Placeholder for share action
              className='group flex cursor-pointer items-center gap-0.5 text-gray-600 transition-colors hover:text-green-600' // Reduced gap
            >
              <Share2 className='h-3.5 w-3.5' />
              <span>12 reposts</span>
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
