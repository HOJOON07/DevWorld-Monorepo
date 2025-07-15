import { sampleArticle } from '../../mock/mock-data';
import CompactNavigation from './CompactNavigation';
import HeaderTitle from './HeaderTitle';
import StatusIndicator from './StatusIndicator';

type SidebarMode = 'preview' | 'workspace' | 'notifications' | 'profile';

interface Props {
  activeMode: SidebarMode;
  setActiveMode: (activeMode: SidebarMode) => void;
}

export default function SidePannelHeader({ activeMode, setActiveMode }: Props) {
  return (
    <div className='border-gray-100 border-b bg-gradient-to-r from-blue-50 to-purple-50 p-4'>
      <div className='mb-4 flex items-center justify-between'>
        <StatusIndicator label='Multi Panel' />
        <CompactNavigation activeMode={activeMode} onModeChange={setActiveMode} />
      </div>

      {activeMode === 'preview' && (
        <HeaderTitle title={sampleArticle.title} subtitle={sampleArticle.subtitle} />
      )}
    </div>
  );
}
