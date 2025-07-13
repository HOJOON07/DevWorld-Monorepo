import { AvatarFallback, AvatarImage, Avatar as AvatarUI, cn } from '@devworld/ui';
import { useState } from 'react';

export default function Avatar() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className='flex cursor-pointer items-center space-x-2 pl-4 text-muted-foreground'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          'rounded-full transition-all duration-200',
          isHovered && 'ring-2 ring-primary',
        )}
      >
        <AvatarUI>
          <AvatarImage src='https://github.com/leerob.png' alt='@leerob' />
          <AvatarFallback>LR</AvatarFallback>
        </AvatarUI>
      </div>
      <div
        className={cn(
          '-translate-x-2 w-0 whitespace-nowrap text-sm opacity-0 transition-all duration-200 ease-in-out group-hover:w-auto group-hover:translate-x-0 group-hover:opacity-100',
          isHovered ? 'text-primary' : 'text-text-secondary',
        )}
      >
        Guest
      </div>
    </div>
  );
}
