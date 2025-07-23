import { ScrollArea } from '@devworld/ui';
import { useState } from 'react';
import SidePannelHeader from './Header';
import Preview from './Preview';
import Profile from './Profile';

type SidebarMode = 'preview' | 'profile';

export default function SidePannel() {
  const [activeMode, setActiveMode] = useState<SidebarMode>('preview');

  const renderModeContent = () => {
    switch (activeMode) {
      case 'preview':
        return <Preview />;
      case 'profile':
        return <Profile />;
      default:
        return null;
    }
  };

  return (
    <div className='flex h-screen w-full max-w-[480px] flex-col border-gray-200 border-l bg-white '>
      <SidePannelHeader activeMode={activeMode} setActiveMode={setActiveMode} />
      <ScrollArea className='flex-1'>
        <div className='p-6'>{renderModeContent()}</div>
      </ScrollArea>
    </div>
  );
}
