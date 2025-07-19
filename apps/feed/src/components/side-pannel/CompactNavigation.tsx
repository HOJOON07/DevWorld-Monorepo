import { FileText, User } from '@devworld/ui';
import TabButton from './TabButton';

type SidebarMode = 'preview' | 'profile';

interface CompactNavigationProps {
  activeMode: SidebarMode;
  onModeChange: (mode: SidebarMode) => void;
}
const tabs = [
  {
    mode: 'preview' as const,
    icon: <FileText className='h-4 w-4' />,
    title: 'Article Preview',
  },
  {
    mode: 'profile' as const,
    icon: <User className='h-4 w-4' />,
    title: 'Profile Settings',
  },
];

export default function CompactNavigation({ activeMode, onModeChange }: CompactNavigationProps) {
  return (
    <div className='flex items-center space-x-1'>
      {tabs.map(({ mode, icon, title }) => (
        <TabButton
          key={mode}
          icon={icon}
          isActive={activeMode === mode}
          onClick={() => onModeChange(mode)}
          title={title}
        />
      ))}
    </div>
  );
}
