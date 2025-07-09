import { ArrowRight, Button } from '@devworld/ui';

export default function VerifyButton({ isVerifying }: { isVerifying: boolean }) {
  return (
    <Button type='submit' className='w-full' disabled={isVerifying}>
      {isVerifying ? (
        <>
          <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2' />
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
