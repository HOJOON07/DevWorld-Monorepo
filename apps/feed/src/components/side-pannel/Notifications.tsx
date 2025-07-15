import { Bell, Button, Heart, MessageSquare, UserPlus, cn } from '@devworld/ui';
import { notifications } from '../../mock/mock-data';

export default function Notifications() {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className='h-4 w-4 text-red-500' />;
      case 'comment':
        return <MessageSquare className='h-4 w-4 text-blue-500' />;
      case 'follow':
        return <UserPlus className='h-4 w-4 text-green-500' />;
      case 'mention':
        return <Bell className='h-4 w-4 text-purple-500' />;
      default:
        return <Bell className='h-4 w-4 text-gray-500' />;
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h3 className='font-semibold text-gray-900 text-lg'>Notifications</h3>
        <Button size='sm' variant='ghost'>
          Mark all read
        </Button>
      </div>

      <div className='space-y-2'>
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={cn(
              'cursor-pointer rounded-lg border p-3 transition-colors',
              notification.read ? 'border-gray-100 bg-white' : 'border-blue-200 bg-blue-50'
            )}
          >
            <div className='flex items-start space-x-3'>
              <div className='mt-0.5'>{getNotificationIcon(notification.type)}</div>
              <div className='min-w-0 flex-1'>
                <p className='text-gray-900 text-sm'>{notification.message}</p>
                {notification.article && (
                  <p className='mt-1 text-gray-500 text-xs'>"{notification.article}"</p>
                )}
                <p className='mt-1 text-gray-400 text-xs'>{notification.time}</p>
              </div>
              {!notification.read && (
                <div className='mt-2 h-2 w-2 rounded-full bg-blue-500'></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}