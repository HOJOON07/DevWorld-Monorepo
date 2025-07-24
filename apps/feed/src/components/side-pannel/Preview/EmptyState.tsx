interface EmptyStateProps {
  message?: string;
}

export default function EmptyState({ 
  message = 'Select an article to preview' 
}: EmptyStateProps) {
  return (
    <div className='flex h-64 items-center justify-center'>
      <div className='text-center'>
        <div className='mx-auto mb-4 h-12 w-12 text-gray-400'>
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
              d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
            />
          </svg>
        </div>
        <p className='text-gray-500 text-sm'>{message}</p>
      </div>
    </div>
  );
}