import { FileText, User } from '@devworld/ui';
import TabButton from './TabButton';
import ThemeButton from './ThemeButton';

const tabs = [
  {
    mode: 'My Profile' as const,
    icon: <User className='h-4 w-4' />,
  },
  {
    mode: 'Preview' as const,
    icon: <FileText className='h-4 w-4' />,
  },
];

export default function CompactNavigation() {
  return (
    <div className='flex items-center space-x-1'>
      {tabs.map(({ mode, icon }) => (
        <TabButton key={mode} icon={icon} mode={mode} />
      ))}
      <ThemeButton />
    </div>
  );
}
