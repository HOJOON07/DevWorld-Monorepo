import {
  Button,
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@devworld/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { AuthEmailLogin } from '../api/email-login';
import { SignInSchema, SignInType } from '../lib/form-validation';

export default function SignInForm() {
  const form = useForm<SignInType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: SignInType) => {
    try {
      await AuthEmailLogin(values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='grid gap-6'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='grid gap-3'>
                <FormLabel>Email</FormLabel>
                <Input
                  {...field}
                  id='email'
                  type='email'
                  placeholder='devworld@example.com'
                  required
                ></Input>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem className='grid gap-3'>
                <div className='flex items-center'>
                  <FormLabel>Password</FormLabel>
                  <a href='#' className='ml-auto text-sm underline-offset-4 hover:underline'>
                    Forgot your password?
                  </a>
                </div>
                <Input {...field} id='password' type='password' required></Input>
                <FormMessage />
                <FormDescription />
              </FormItem>
            )}
          />
          <Button type='submit' className='w-full'>
            Login
          </Button>
        </div>
      </form>
    </Form>
  );
}
