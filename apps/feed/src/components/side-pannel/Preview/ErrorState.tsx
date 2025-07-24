interface ErrorStateProps {
  error: Error | null;
  onRetry?: () => void;
}

export default function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className='flex h-64 items-center justify-center'>
      <div className='text-center'>
        <div className='mx-auto mb-4 h-12 w-12 text-red-400'>
          <svg
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={1.5}
              d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z'
            />
          </svg>
        </div>
        <p className='mb-3 text-gray-900 text-sm font-medium'>Failed to load article</p>
        <p className='mb-4 text-gray-500 text-xs'>{error?.message || 'Something went wrong'}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className='rounded-md bg-blue-600 px-3 py-1.5 text-white text-sm font-medium hover:bg-blue-700'
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}