import { cn } from '@devworld/ui';
import { ReactNode } from 'react';

interface TabButtonProps {
  icon: ReactNode;
  isActive: boolean;
  onClick: () => void;
  title: string;
  badge?: ReactNode;
}

export default function TabButton({ icon, isActive, onClick, title, badge }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative rounded-md p-2 transition-colors',
        isActive ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900',
      )}
      title={title}
    >
      {icon}
      {badge}
    </button>
  );
}
