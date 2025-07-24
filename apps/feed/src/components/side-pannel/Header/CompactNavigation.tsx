import { FileText, User } from '@devworld/ui';
import TabButton from '../TabButton';

const tabs = [
  {
    mode: 'Preview' as const,
    icon: <FileText className='h-4 w-4' />,
  },
  {
    mode: 'My Profile' as const,
    icon: <User className='h-4 w-4' />,
  },
];

export default function CompactNavigation() {
  return (
    <div className='flex items-center space-x-1'>
      {tabs.map(({ mode, icon }) => (
        <TabButton key={mode} icon={icon} mode={mode} />
      ))}
    </div>
  );
}
