export default function LoadingState() {
  return (
    <div className='flex h-64 items-center justify-center'>
      <div className='flex flex-col items-center space-y-3'>
        <div className='h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600'></div>
        <p className='text-gray-500 text-sm'>Loading article...</p>
      </div>
    </div>
  );
}