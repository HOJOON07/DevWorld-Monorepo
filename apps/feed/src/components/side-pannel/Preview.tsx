import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Calendar,
  ChevronRight,
  Clock,
  Separator,
  Star,
  TrendingUp,
  Users,
} from '@devworld/ui';
import { sampleArticle } from '../../mock/mock-data';

export default function Preview() {
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

  return (
    <div className='space-y-6'>
      {/* Featured Image */}
      <div className='relative overflow-hidden rounded-xl'>
        <img
          src={sampleArticle.image || '/placeholder.svg'}
          alt={sampleArticle.title}
          className='h-48 w-full object-cover'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent'></div>
        <div className='absolute right-3 bottom-3 left-3'>
          <div className='flex items-center justify-between'>
            <Badge className='bg-white/90 font-medium text-gray-800'>
              {sampleArticle.difficulty}
            </Badge>
            <div className='flex items-center space-x-1 text-sm text-white'>
              <Clock className='h-3 w-3' />
              <span>{sampleArticle.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Author Info */}
      <div className='flex items-center space-x-3 rounded-xl bg-gray-50 p-4'>
        <Avatar className='h-12 w-12 ring-2 ring-white'>
          <AvatarImage
            src={sampleArticle.author.avatar || '/placeholder.svg'}
            alt={sampleArticle.author.name}
          />
          <AvatarFallback className='bg-gradient-to-r from-blue-500 to-purple-500 text-white'>
            {sampleArticle.author.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
        <div className='flex-1'>
          <div className='flex items-center space-x-1'>
            <h4 className='font-semibold text-gray-900'>{sampleArticle.author.name}</h4>
            {sampleArticle.author.verified && (
              <Star className='h-4 w-4 fill-current text-blue-500' />
            )}
          </div>
          <p className='text-gray-600 text-sm'>{sampleArticle.author.role}</p>
          <p className='text-gray-500 text-xs'>{sampleArticle.author.company}</p>
          <div className='mt-1 flex items-center space-x-1'>
            <Users className='h-3 w-3 text-gray-400' />
            <span className='text-gray-500 text-xs'>
              {formatNumber(sampleArticle.author.followers)} followers
            </span>
          </div>
        </div>
      </div>

      {/* Meta Information */}
      <div className='space-y-3'>
        <div className='flex items-center justify-between text-gray-600 text-sm'>
          <div className='flex items-center space-x-1'>
            <Calendar className='h-4 w-4' />
            <span>Published {formatDate(sampleArticle.publishedAt)}</span>
          </div>
          <div className='flex items-center space-x-1'>
            <TrendingUp className='h-4 w-4 text-green-600' />
            <span className='font-medium text-green-600'>Trending</span>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className='space-y-2'>
        <h5 className='font-medium text-gray-900 text-sm'>Topics</h5>
        <div className='flex flex-wrap gap-2'>
          {sampleArticle.tags.map((tag) => (
            <Badge
              key={tag}
              variant='outline'
              className='cursor-pointer text-xs hover:bg-gray-100'
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Excerpt */}
      <div className='space-y-2'>
        <h5 className='font-medium text-gray-900 text-sm'>Preview</h5>
        <p className='text-gray-600 text-sm leading-relaxed'>{sampleArticle.excerpt}</p>
      </div>

      {/* Content Preview */}
      <div className='space-y-2'>
        <h5 className='font-medium text-gray-900 text-sm'>Content Outline</h5>
        <div
          className='prose prose-sm max-w-none text-gray-600 text-sm leading-relaxed'
          dangerouslySetInnerHTML={{ __html: sampleArticle.content }}
        />
      </div>

      <Separator />

      {/* Related Articles */}
      <div className='space-y-3'>
        <h5 className='font-medium text-gray-900 text-sm'>Related Articles</h5>
        <div className='space-y-2'>
          {sampleArticle.relatedArticles.map((article, index) => (
            <div
              key={index}
              className='flex cursor-pointer items-center justify-between rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100'
            >
              <div className='flex-1'>
                <p className='font-medium text-gray-900 text-sm'>{article.title}</p>
                <p className='text-gray-500 text-xs'>{article.readTime}</p>
              </div>
              <ChevronRight className='h-4 w-4 text-gray-400' />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}