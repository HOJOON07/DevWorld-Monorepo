import { Text } from '@devworld/ui';
import DevWorldLogo from '../assets/logo-image/DevWorldLogo.png';
import { SignInForm } from '../components';

export default function SignInPage() {
  return (
    <div className='bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10'>
      <div className='flex w-full max-w-sm flex-col gap-6'>
        <a href='#' className='flex items-center gap-2 self-center'>
          <img src={DevWorldLogo} alt='DevWorld Logo' className='size-8' />
          <Text as='h1' variant='p' className='text-primary font-medium text-xl'>
            DevWorld
          </Text>
        </a>
        <SignInForm />
      </div>
    </div>
  );
}
