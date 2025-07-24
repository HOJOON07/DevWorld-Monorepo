import { Card, CardContent, CardHeader } from '@devworld/ui';
import { Feed } from '../../api/get-feeds';
import { useSidePanelStore } from '../../stores/side-panel-store';
import BookmarkButton from './BookmarkButton';
import CommentButton from './CommentButton';
import LikeButton from './LikeButton';
import ShareButton from './ShareButton';
import UserProfileHover from './UserProfileHover';

export default function FeedCard(props: Feed) {
  const { author, title, description, likeCount, commentCount, id, articleImage } = props;
  const { setSelectedArticle } = useSidePanelStore();

  const userForProfile = {
    name: author.devName,
    avatar: author.avatarImage,
    position: author.position,
    location: author.location,
  };

  return (
    <Card className='gap-4 overflow-hidden rounded-xl border-0 bg-gradient-to-br from-white to-gray-50/30 py-4 shadow-sm transition-all duration-300 hover:shadow-md'>
      <CardHeader className='px-4'>
        <div className='flex items-start justify-between'>
          <div className='flex items-start'>
            <UserProfileHover user={userForProfile} />
          </div>
          <BookmarkButton />
        </div>
      </CardHeader>

      <CardContent className='px-4'>
        <div className='space-y-3'>
          {articleImage && (
            <div className='overflow-hidden rounded-lg'>
              <img src={articleImage} alt={title} className='h-48 w-full object-cover' />
            </div>
          )}

          <div className='prose prose-xs max-w-none'>
            <h3 className='mb-1 font-semibold text-gray-900 text-sm'>{title}</h3>
            <p className='text-gray-800 text-sm leading-relaxed'>{description}</p>
            <button
              onClick={() => setSelectedArticle(id.toString())}
              className='mt-1.5 font-medium text-blue-600 text-xs transition-colors duration-200 hover:text-blue-700 hover:underline'
            >
              Read more
            </button>
          </div>

          <div className='mt-3 flex items-center justify-between border-gray-100 border-t pt-3 text-gray-600 text-xs'>
            <div className='flex items-center gap-3'>
              <LikeButton initialLikes={likeCount} postId={id.toString()} />
              <CommentButton initialCount={commentCount} postId={id.toString()} />
            </div>
            <ShareButton postId={id.toString()} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
