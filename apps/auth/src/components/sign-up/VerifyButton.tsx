import { ArrowRight, Button } from '@devworld/ui';

export default function VerifyButton({ isVerifying }: { isVerifying: boolean }) {
  return (
    <Button type='submit' className='w-full' disabled={isVerifying}>
      {isVerifying ? (
        <>
          <div className='mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent' />
          Verifying...
        </>
      ) : (
        <>
          Verify Code
          <ArrowRight className='ml-2 h-4 w-4' />
        </>
      )}
    </Button>
  );
}
