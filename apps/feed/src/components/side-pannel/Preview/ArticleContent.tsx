import { GetArticleDetailResponseType } from '../../../api/get-article-detail';
import StaticEditor from '../../static-editor/Editor';

interface ArticleContentProps {
  article: GetArticleDetailResponseType;
}

export default function ArticleContent({ article }: ArticleContentProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className='space-y-6'>
      {/* Article Header */}
      <div className='space-y-4'>
        <h1 className='font-bold text-gray-900 text-xl leading-tight'>{article.title}</h1>

        <div className='flex items-center justify-between text-gray-500 text-sm'>
          <span>{formatDate(article.createdAt)}</span>
          <div className='flex items-center space-x-4'>
            <span className='flex items-center'>
              <svg className='mr-1 h-4 w-4' fill='currentColor' viewBox='0 0 20 20'>
                <path
                  fillRule='evenodd'
                  d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z'
                  clipRule='evenodd'
                />
              </svg>
              {article.likeCount}
            </span>
            <span className='flex items-center'>
              <svg className='mr-1 h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
                />
              </svg>
              {article.commentCount}
            </span>
          </div>
        </div>

        {article.description && (
          <p className='text-gray-600 leading-relaxed'>{article.description}</p>
        )}
      </div>
      <StaticEditor contents={article.contents} />
    </div>
  );
}
