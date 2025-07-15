import { ScrollArea } from '@devworld/ui';
import { useState } from 'react';
import SidePannelHeader from './Header';
import Notifications from './Notifications';
import Preview from './Preview';
import Profile from './Profile';
import Workspace from './Workspace';

type SidebarMode = 'preview' | 'workspace' | 'notifications' | 'profile';

// 샘플 데이터들

export default function SidePannel() {
  const [activeMode, setActiveMode] = useState<SidebarMode>('preview');

  const renderModeContent = () => {
    switch (activeMode) {
      case 'preview':
        return <Preview />;
      case 'workspace':
        return <Workspace />;
      case 'notifications':
        return <Notifications />;
      case 'profile':
        return <Profile />;
      default:
        return null;
    }
  };

  return (
    <div className='flex h-screen w-full max-w-md flex-col border-gray-200 border-l bg-white '>
      <SidePannelHeader activeMode={activeMode} setActiveMode={setActiveMode} />

      <ScrollArea className='flex-1'>
        <div className='p-6'>{renderModeContent()}</div>
      </ScrollArea>
    </div>
  );
}
