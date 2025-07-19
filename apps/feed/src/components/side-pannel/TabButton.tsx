import { Button, cn } from '@devworld/ui';
import { ReactNode } from 'react';

interface TabButtonProps {
  icon: ReactNode;
  isActive: boolean;
  onClick: () => void;
  title: string;
  badge?: ReactNode;
}

export default function TabButton({ icon, isActive, onClick, badge }: TabButtonProps) {
  return (
    <Button
      size='icon'
      variant='ghost'
      onClick={onClick}
      className={cn(
        'relative cursor-pointer rounded-md p-2 transition-colors hover:text-green-500',
        isActive ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600',
      )}
    >
      {icon}
      {badge}
    </Button>
  );
}
