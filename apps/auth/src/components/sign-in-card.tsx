import { Card, CardContent, CardDescription, CardHeader, CardTitle, cn } from '@devworld/ui';
import React from 'react';
import OAuthButton from './oauth-button';
import SignInForm from './sign-in-form';

interface ComponentProps extends React.ComponentProps<'div'> {
  className?: string;
}

export default function SignInCard({ className, ...props }: ComponentProps) {
  return (
    <div className='flex flex-col gap-6' {...props}>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>Welcome back</CardTitle>
          <CardDescription>Login with your Github or Google account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid gap-6'>
            <div className='flex flex-col gap-4'>
              <OAuthButton iconName='github' label='Login with Github' provider='github' />
              <OAuthButton iconName='google' label='Login with Google' provider='google' />
            </div>
            <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
              <span className='bg-card text-muted-foreground relative z-10 px-2'>
                Or continue with
              </span>
            </div>
            <SignInForm />
            <div className='text-center text-sm'>
              Don't have an account?
              <a href='#' className='underline underline-offset-4'>
                Sign up
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className='text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4'>
        By clicking continue, you agree to our <a href='#'>Terms of Service</a> and{' '}
        <a href='#'>Privacy Policy</a>.
      </div>
    </div>
  );
}
