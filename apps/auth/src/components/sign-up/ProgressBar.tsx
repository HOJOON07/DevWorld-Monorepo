import { Progress } from '@devworld/ui';

type ProgressBarProps = {
  value: number;
};

function ProgressBar({ value }: ProgressBarProps) {
  return (
    <div className='space-y-2'>
      <div className='flex justify-between text-sm text-muted-foreground'>
        <span>Progress</span>
        <span>{Math.round(value)}%</span>
      </div>
      <Progress value={value} className='h-2' />
    </div>
  );
}

export default ProgressBar;
