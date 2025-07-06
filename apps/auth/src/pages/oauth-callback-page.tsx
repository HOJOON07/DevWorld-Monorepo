import { useOAuthCallback } from '../hooks/useOAuthCallback';

export default function OAuthCallbackPage() {
  const { isLoading, error, data } = useOAuthCallback();

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <div
            className='animate-spin inline-block size-12 border-3 border-current border-t-transparent text-primary-foreground rounded-full dark:text-primary-foreground'
            role='status'
            aria-label='loading'
          >
            <span className='sr-only'>Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center text-red-600'>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (data) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <h2 className='text-xl font-bold mb-4 text-green-600'>\�x 1�!</h2>
          <div className='bg-gray-100 p-4 rounded-md'>
            <h3 className='font-bold mb-2'>Q� pt0:</h3>
            <pre className='text-left text-sm overflow-auto'>{JSON.stringify(data, null, 2)}</pre>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
