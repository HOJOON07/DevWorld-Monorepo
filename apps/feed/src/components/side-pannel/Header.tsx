import { Bell, Briefcase, FileText, User } from '@devworld/ui';
import { notifications, sampleArticle } from '../../mock/mock-data';

type SidebarMode = 'preview' | 'workspace' | 'notifications' | 'profile';

interface Props {
  activeMode: SidebarMode;
  setActiveMode: (activeMode: SidebarMode) => void;
}

export default function SidePannelHeader({ activeMode, setActiveMode }: Props) {
  return (
    <div className='border-gray-100 border-b bg-gradient-to-r from-blue-50 to-purple-50 p-4'>
      <div className='mb-4 flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <div className='h-2 w-2 animate-pulse rounded-full bg-green-500'></div>
          <span className='font-medium text-gray-600 text-sm'>Multi Panel</span>
        </div>

        {/* Compact Mode Icons */}
        <div className='flex items-center space-x-1'>
          <button
            onClick={() => setActiveMode('preview')}
            className={`relative rounded-md p-2 transition-colors ${
              activeMode === 'preview'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            title='Article Preview'
          >
            <FileText className='h-4 w-4' />
          </button>
          <button
            onClick={() => setActiveMode('workspace')}
            className={`relative rounded-md p-2 transition-colors ${
              activeMode === 'workspace'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            title='Workspace'
          >
            <Briefcase className='h-4 w-4' />
          </button>
          <button
            onClick={() => setActiveMode('notifications')}
            className={`relative rounded-md p-2 transition-colors ${
              activeMode === 'notifications'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            title='Notifications'
          >
            <Bell className='h-4 w-4' />
            {notifications.filter((n) => !n.read).length > 0 && (
              <div className='-top-1 -right-1 absolute h-2 w-2 rounded-full bg-red-500'></div>
            )}
          </button>
          <button
            onClick={() => setActiveMode('profile')}
            className={`relative rounded-md p-2 transition-colors ${
              activeMode === 'profile'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            title='Profile Settings'
          >
            <User className='h-4 w-4' />
          </button>
        </div>
      </div>

      <div className='mt-0'>
        {activeMode === 'preview' && (
          <>
            <h1 className='mb-1 font-bold text-gray-900 text-lg leading-tight'>
              {sampleArticle.title}
            </h1>
            <p className='text-gray-600 text-sm'>{sampleArticle.subtitle}</p>
          </>
        )}
      </div>
    </div>
  );
}
