import { Avatar, AvatarFallback, AvatarImage, Calendar, TrendingUp, Users } from '@devworld/ui';
import { GetArticleDetailResponseType } from '../../../api/get-article-detail';
import { useGetAuthor } from '../../../api/query-hooks/use-get-author';
import StaticEditor from '../../static-editor/Editor';

interface ArticleContentProps {
  article: GetArticleDetailResponseType;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const formatNumber = (num: number) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export default function ArticleContent({ article }: ArticleContentProps) {
  const { data } = useGetAuthor();

  return (
    <div className='space-y-6'>
      <div className='flex items-center space-x-3 rounded-xl bg-gray-50 p-4'>
        <Avatar className='h-12 w-12 ring-2 ring-white'>
          <AvatarImage src={'/placeholder.svg'} />
          <AvatarFallback className='bg-gradient-to-r from-blue-500 to-purple-500 text-white'>
            author name
          </AvatarFallback>
        </Avatar>
        <div className='flex-1'>
          <div className='flex items-center space-x-1'>
            <h4 className='font-semibold text-gray-900'>{data?.author.devName}</h4>
          </div>
          <p className='text-gray-600 text-sm'>{data?.author.position || 'FrontEnd Engineer'}</p>
          <div className='mt-1 flex items-center space-x-3'>
            <p className='text-gray-500 text-xs'>{data?.author.location || 'Seoul'}</p>
            <div className='flex items-center gap-1'>
              <Users className='h-3 w-3 text-gray-400' />
              <span className='text-gray-500 text-xs'>
                {data?.author.followerCount || '10k'} followers
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className='space-y-3'>
        <div className='flex items-center justify-between text-gray-600 text-sm'>
          <div className='flex items-center space-x-1'>
            <Calendar className='h-4 w-4' />
            <span>Published {formatDate(article.createdAt)}</span>
          </div>
          <div className='flex items-center space-x-1'>
            <TrendingUp className='h-4 w-4 text-green-600' />
            <span className='font-medium text-green-600'>Trending</span>
          </div>
        </div>
      </div>

      <StaticEditor contents={article.contents} />
    </div>
  );
}
