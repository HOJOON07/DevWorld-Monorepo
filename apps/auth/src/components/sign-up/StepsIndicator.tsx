import { cva } from '@devworld/ui';
import React from 'react';
import { type Step, type StepOrder } from './CardHeader';

type StepVariant = 'complete' | 'current' | 'upcoming';

function getStepVariant(order: StepOrder, currentStep: StepOrder): StepVariant {
  if (order < currentStep) return 'complete';
  if (order === currentStep) return 'current';
  return 'upcoming';
}

const stepCircle = cva(
  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
  {
    variants: {
      variant: {
        complete: 'bg-green-500 text-white',
        current: 'bg-primary text-primary-foreground',
        upcoming: 'bg-muted text-muted-foreground',
      },
    },
  },
);

const stepLabel = cva('text-sm', {
  variants: {
    variant: {
      complete: 'font-medium text-foreground',
      current: 'font-medium text-foreground',
      upcoming: 'text-muted-foreground',
    },
  },
});

type StepsIndicatorProps = {
  steps: Step[];
  currentStep: StepOrder;
};

function StepsIndicator({ steps, currentStep }: StepsIndicatorProps) {
  return (
    <div className='flex items-center justify-between'>
      {steps.map((stepItem, index) => {
        const variant = getStepVariant(stepItem.order, currentStep);

        return (
          <React.Fragment key={stepItem.order}>
            <div className='flex items-center space-x-2'>
              <div className={stepCircle({ variant })}>
                {variant === 'complete' ? '✓' : stepItem.order}
              </div>
              <span className={stepLabel({ variant })}>{stepItem.name}</span>
            </div>
            {index < steps.length - 1 && <div className='flex-1 h-px bg-muted mx-4'></div>}
          </React.Fragment>
        );
      })}
    </div>
  );
}
export default StepsIndicator;
