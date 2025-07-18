import { CardContent, Form, FormField } from '@devworld/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useSignUp } from '../../api/query-hooks/use-sign-up';
import { SignUpSchema, SignUpType } from '../../lib/form-validation';
import { useFunnel } from '../common/Funnel';
import BackButton from './buttons/BackButton';
import SubmitButton from './buttons/SubmitButton';
import EmailInput from './inputs/EmailInput';
import PasswordInput from './inputs/PasswordInput';
import UsernameInput from './inputs/UsernameInput';

export default function SignUpProfileForm() {
  const { data: funnelData, setData } = useFunnel();
  const signUpMutaion = useSignUp();

  const form = useForm<SignUpType & { _isUsernameChecked?: boolean }>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: funnelData.email || '',
      devName: funnelData.devName || '',
      password: '',
      passwordConfirm: '',
      _isUsernameChecked: false,
    },
  });

  const onSubmit = async (data: SignUpType) => {
    const isUsernameChecked = form.watch('_isUsernameChecked') || false;

    if (!isUsernameChecked) {
      form.setError('devName', {
        type: 'manual',
        message: 'Please check username availability first',
      });
      return;
    }

    try {
      // funnel 데이터 업데이트
      setData(data);
      signUpMutaion.mutate(data);
      // // 실제 회원가입 API 호출
      // // const { accessToken, refreshToken } = await emailRegister(data);

      // // 토큰 저장
      // localStorage.setItem('accessToken', accessToken);
      // localStorage.setItem('refreshToken', refreshToken);

      // 성공 처리
    } catch (err) {
      form.setError('root', {
        type: 'manual',
        message: 'Registration failed. Please try again.',
      });
    }
  };

  return (
    <CardContent className='space-y-6'>
      <Form {...form}>
        <form className='space-y-5' onSubmit={form.handleSubmit(onSubmit)}>
          <EmailInput form={form} />
          <UsernameInput form={form} />
          <PasswordInput form={form} />
          <div className='pt-4 space-y-3'>
            <SubmitButton form={form} />
            <BackButton form={form} />
          </div>
        </form>
      </Form>

      <div className='text-center space-y-2'>
        <p className='text-xs text-muted-foreground'>
          By creating an account, you agree to our{' '}
          <a href='#' className='text-primary hover:underline font-medium'>
            Terms of Service
          </a>{' '}
          and{' '}
          <a href='#' className='text-primary hover:underline font-medium'>
            Privacy Policy
          </a>
        </p>
      </div>
    </CardContent>
  );
}
