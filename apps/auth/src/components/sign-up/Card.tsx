import { Card } from '@devworld/ui';
import { SignUpType } from '../../lib/form-validation';
import { Funnel } from '../common/Funnel';
import SignUpCardHeader from './CardHeader';
import SignUpEmailSentForm from './EmailSentForm';
import SignUpEmailVerifyForm from './EmailVerifyForm';
import SignUpProfileForm from './ProfileForm';

const initialData: Pick<SignUpType, 'email'> = {
  email: '',
};

export default function SignUpCard() {
  return (
    <Card>
      <Funnel initialData={initialData}>
        <SignUpCardHeader />
        <Funnel.Step step={3}>
          <SignUpEmailSentForm />
        </Funnel.Step>
        <Funnel.Step step={2}>
          <SignUpEmailVerifyForm />
        </Funnel.Step>
        <Funnel.Step step={1}>
          <SignUpProfileForm />
        </Funnel.Step>
      </Funnel>
    </Card>
  );
}
