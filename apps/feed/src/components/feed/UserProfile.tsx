import { Avatar, AvatarFallback, AvatarImage, Badge, TrendingUp } from '@devworld/ui';

interface UserProfileProps {
  user: {
    name: string;
    avatar: string;
    title: string;
    isVerified: boolean;
  };
}

export default function UserProfile({ user }: UserProfileProps) {
  return (
    <div className='flex w-full cursor-pointer items-start gap-3'>
      <div className='relative'>
        <Avatar className='h-10 w-10 ring-1 ring-blue-100'>
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className='bg-gradient-to-br from-blue-500 to-purple-600 font-semibold text-sm text-white'>
            {user.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
        <div className='-bottom-0.5 -right-0.5 absolute h-3 w-3 rounded-full border border-white bg-green-500'></div>
      </div>
      <div className='min-w-0 flex-1'>
        <div className='flex flex-wrap items-center gap-1.5'>
          <h3 className='font-semibold text-gray-900 text-sm'>{user.name}</h3>
          {user.isVerified && (
            <Badge
              variant='secondary'
              className='bg-blue-50 px-1.5 py-0.5 text-blue-700 text-xs hover:bg-blue-100'
            >
              <TrendingUp className='mr-0.5 h-2.5 w-2.5' />
              Top Voice
            </Badge>
          )}
        </div>
        <p className='mt-0.5 text-muted-foreground text-xs'>{user.title}</p>
      </div>
    </div>
  );
}
