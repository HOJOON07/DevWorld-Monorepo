import {
  ArrowRight,
  Button,
  CardContent,
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Loader,
  Mail,
} from '@devworld/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useEmailSentVerificationCode } from '../../api/query-hooks/use-email-sent-verification-code';
import { EmailSentSchema, EmailSentType } from '../../lib/form-validation';
import { useFunnel } from '../common/Funnel';

export default function SignUpEmailSentForm() {
  const { setData, nextStep } = useFunnel();

  const emailSentMutation = useEmailSentVerificationCode();
  const isLoading = emailSentMutation.isPending;

  const form = useForm<EmailSentType>({
    resolver: zodResolver(EmailSentSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: EmailSentType) => {
    emailSentMutation.mutate(values, {
      onSuccess: () => {
        setData({ email: values.email });
        nextStep();
      },
    });
  };

  return (
    <CardContent className='space-y-6'>
      <Form {...form}>
        <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='space-y-0.5'>
                <FormLabel htmlFor='email'>Email Address</FormLabel>
                <div className='relative'>
                  <Mail className='absolute top-3 left-3 h-4 w-4 text-muted-foreground' />
                  <Input
                    {...field}
                    id='email'
                    type='email'
                    placeholder='Enter your email address'
                    className='pl-10'
                    required
                  />
                </div>
                <FormMessage />
                <FormDescription className='text-muted-foreground text-sm'>
                  We'll send a verification code to this email address
                </FormDescription>
              </FormItem>
            )}
          />
          <Button type='submit' className='w-full' disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader className='h-4 w-4 animate-spin' />
                Sending Code...
              </>
            ) : (
              <>
                Send Verification Code
                <ArrowRight className='ml-2 h-4 w-4' />
              </>
            )}
          </Button>
        </form>
      </Form>
      <div className='flex justify-center gap-2 text-center text-sm'>
        <p className='text-muted-foreground'>Already have an account?</p>
        <Link to='/signin' className='font-medium text-primary hover:underline'>
          Sign In
        </Link>
      </div>
    </CardContent>
  );
}
