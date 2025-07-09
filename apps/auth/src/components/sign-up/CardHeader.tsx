import { CardDescription, CardHeader, CardTitle, Progress } from '@devworld/ui';
import { useFunnel } from '../common/Funnel';
import ProgressBar from './ProgressBar';
import StepsIndicator from './StepsIndicator';

export type StepOrder = 1 | 2 | 3;
export type StepName = 'Email' | 'Verify' | 'Profile';
export type StepDescription = 'Email Verification' | 'Code Verification' | 'Complete Profile';

export type Step = {
  order: StepOrder;
  name: StepName;
  description: StepDescription;
};
const STEPS: Step[] = [
  { order: 1, name: 'Email', description: 'Email Verification' },
  { order: 2, name: 'Verify', description: 'Code Verification' },
  { order: 3, name: 'Profile', description: 'Complete Profile' },
];

export default function SignUpCardHeader() {
  const { step } = useFunnel();

  const currentStepOrder = STEPS.findIndex((s) => s.order === step);
  const currentStep = STEPS[currentStepOrder] || STEPS[0];
  const progressValue = ((currentStepOrder + 1) / STEPS.length) * 100;

  return (
    <CardHeader className='space-y-4'>
      <div className='space-y-2'>
        <CardTitle className='text-2xl font-bold text-center'>Create Account</CardTitle>
        <CardDescription className='text-center'>
          Step {currentStep.order} of {STEPS.length}: {currentStep.description}
        </CardDescription>
      </div>
      <ProgressBar value={progressValue} />
      <StepsIndicator steps={STEPS} currentStep={step as StepOrder} />
    </CardHeader>
  );
}
