import { cn } from '@devworld/ui';

interface StatusIndicatorProps {
  isActive?: boolean;
  label: string;
}

export default function StatusIndicator({ isActive = true, label }: StatusIndicatorProps) {
  return (
    <div className='flex items-center space-x-2'>
      <div
        className={cn(
          'h-2 w-2 rounded-full',
          isActive ? 'animate-pulse bg-green-500' : 'bg-gray-400',
        )}
      ></div>
      <span className='font-medium text-gray-600 text-sm'>{label}</span>
    </div>
  );
}
