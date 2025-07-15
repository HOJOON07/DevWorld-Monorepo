import { Bell, Briefcase, FileText, User } from '@devworld/ui';
import { notifications } from '../../mock/mock-data';
import NotificationBadge from './NotificationBadge';
import TabButton from './TabButton';

type SidebarMode = 'preview' | 'workspace' | 'notifications' | 'profile';

interface CompactNavigationProps {
  activeMode: SidebarMode;
  onModeChange: (mode: SidebarMode) => void;
}

export default function CompactNavigation({ activeMode, onModeChange }: CompactNavigationProps) {
  const unreadCount = notifications.filter((n) => !n.read).length;

  const tabs = [
    {
      mode: 'preview' as const,
      icon: <FileText className='h-4 w-4' />,
      title: 'Article Preview',
    },
    {
      mode: 'workspace' as const,
      icon: <Briefcase className='h-4 w-4' />,
      title: 'Workspace',
    },
    {
      mode: 'notifications' as const,
      icon: <Bell className='h-4 w-4' />,
      title: 'Notifications',
      badge: <NotificationBadge count={unreadCount} />,
    },
    {
      mode: 'profile' as const,
      icon: <User className='h-4 w-4' />,
      title: 'Profile Settings',
    },
  ];

  return (
    <div className='flex items-center space-x-1'>
      {tabs.map(({ mode, icon, title, badge }) => (
        <TabButton
          key={mode}
          icon={icon}
          isActive={activeMode === mode}
          onClick={() => onModeChange(mode)}
          title={title}
          badge={badge}
        />
      ))}
    </div>
  );
}