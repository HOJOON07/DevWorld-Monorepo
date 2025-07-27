import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@devworld/ui';
import UserProfile from './UserProfile';

interface UserProfileHoverProps {
  user: {
    name: string;
    avatar: string;
    position: string;
    location?: string;
  };
}

export default function UserProfileHover({ user }: UserProfileHoverProps) {
  return (
    <HoverCard openDelay={150} closeDelay={50}>
      <HoverCardTrigger>
        <UserProfile user={user} />
      </HoverCardTrigger>

      <HoverCardContent className='z-50 w-fit rounded-lg shadow-md'>
        <div className='flex flex-row items-center justify-between pb-2.5'>
          <div className='flex items-center gap-3'>
            <Avatar className='h-14 w-14'>
              <AvatarImage src={user.avatar} alt='User Profile Picture' />
              <AvatarFallback>
                {user.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div className='grid gap-0.5'>
              <p className='font-bold text-base'>{user.name}</p>
              <p className='text-gray-500 text-xs'>
                {user.location && `@${user.location.toLowerCase().replace(/\s+/g, '')}`}location
              </p>
            </div>
          </div>
        </div>
        <p className='mb-1 line-clamp-3 text-gray-800 text-sm leading-snug'>
          {user.position} {user.location && `based in ${user.location}`}.
        </p>
      </HoverCardContent>
    </HoverCard>
  );
}
