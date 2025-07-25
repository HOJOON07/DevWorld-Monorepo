import { Button, cn } from '@devworld/ui';
import { ReactNode } from 'react';
import { useSidePanelStore } from '../../../stores/side-panel-store';

export type SidebarMode = 'Preview' | 'My Profile';

interface TabButtonProps {
  icon: ReactNode;
  mode: SidebarMode;
}

export default function TabButton({ icon, mode }: TabButtonProps) {
  const activeMode = useSidePanelStore((state) => state.activeMode);
  const setActiveMode = useSidePanelStore((state) => state.setActiveMode);

  const handleClick = (mode: SidebarMode) => {
    setActiveMode(mode);
  };

  const isActive = activeMode === mode;

  return (
    <Button
      size='icon'
      variant='ghost'
      onClick={() => handleClick(mode)}
      className={cn(
        'relative cursor-pointer rounded-md p-2 transition-colors hover:text-green-500',
        isActive ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600',
      )}
    >
      {icon}
    </Button>
  );
}
