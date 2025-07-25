import { useSidePanelStore } from '../../../stores/side-panel-store';
import CompactNavigation from './CompactNavigation';

export default function SidePanelHeader() {
  const activeMode = useSidePanelStore((state) => state.activeMode);

  return (
    <div className='border-gray-100 border-b bg-gradient-to-r from-blue-50 to-purple-50 p-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <div className='h-2 w-2 animate-pulse rounded-full bg-green-500' />
          <span className='font-medium text-base text-gray-600'>{activeMode}</span>
        </div>
        <CompactNavigation />
      </div>
    </div>
  );
}
