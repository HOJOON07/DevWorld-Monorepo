import { SignInForm } from '../widgets/ui';
export default function SignInPage() {
  return (
    <div
      className='bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10'
      // style={{
      //   minHeight: '100vh',
      //   backgroundColor: '#f4f4f5',
      //   display: 'flex',
      //   flexDirection: 'column',
      //   alignItems: 'center',
      //   justifyContent: 'center',
      //   padding: '1.5rem',
      // }}
    >
      <div className='flex w-full max-w-sm flex-col gap-6'>
        <a href='#' className='flex items-center gap-2 self-center font-medium'>
          <div className='bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md'>
            {/* <GalleryVerticalEnd className="size-4" /> */}
          </div>
          Acme Inc.
        </a>
        <SignInForm />
      </div>
    </div>
  );
}
