import { ScrollArea } from '@devworld/ui';
import { useSidePanelStore } from '../../stores/side-panel-store';
import SidePanelHeader from './Header/SidePanelHeader';
import PreviewContainer from './Preview/PreviewContainer';
import ProfileContainer from './Profile/ProfileContainer';

export default function SidePanel() {
  const activeMode = useSidePanelStore((state) => state.activeMode);

  const renderModeContent = () => {
    switch (activeMode) {
      case 'Preview':
        return <PreviewContainer />;
      case 'My Profile':
        return <ProfileContainer />;
      default:
        return null;
    }
  };

  return (
    <div className='flex h-screen w-full max-w-[480px] flex-col border-gray-200 border-l bg-white'>
      <SidePanelHeader />
      <ScrollArea className='flex-1'>
        <div className='px-6 py-4'>{renderModeContent()}</div>
      </ScrollArea>
    </div>
  );
}
