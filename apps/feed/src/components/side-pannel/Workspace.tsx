import { Badge, Button, cn, Settings } from '@devworld/ui';
import { workspaceItems } from '../../mock/mock-data';

export default function Workspace() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Review':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h3 className='font-semibold text-gray-900 text-lg'>My Workspace</h3>
        <Button size='sm' variant='outline'>
          <Settings className='mr-1 h-4 w-4' />
          Settings
        </Button>
      </div>

      {/* Quick Stats */}
      <div className='grid grid-cols-2 gap-3'>
        <div className='rounded-lg bg-blue-50 p-3'>
          <div className='font-bold text-2xl text-blue-600'>12</div>
          <div className='text-blue-600 text-xs'>Active Projects</div>
        </div>
        <div className='rounded-lg bg-green-50 p-3'>
          <div className='font-bold text-2xl text-green-600'>8</div>
          <div className='text-green-600 text-xs'>Completed</div>
        </div>
      </div>

      {/* Recent Items */}
      <div className='space-y-3'>
        <h4 className='font-medium text-gray-900 text-sm'>Recent Items</h4>
        <div className='space-y-2'>
          {workspaceItems.map((item) => (
            <div
              key={item.id}
              className='cursor-pointer rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100'
            >
              <div className='mb-2 flex items-start justify-between'>
                <h5 className='font-medium text-gray-900 text-sm'>{item.title}</h5>
                <Badge className={cn('text-xs', getStatusColor(item.status))}>{item.status}</Badge>
              </div>
              <div className='flex items-center justify-between text-gray-500 text-xs'>
                <span>{item.type}</span>
                <span>{item.updated}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button className='w-full'>Create New Project</Button>
    </div>
  );
}
