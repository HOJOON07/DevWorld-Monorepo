import { AvatarFallback, AvatarImage, Avatar as AvatarUI, cn } from '@devworld/ui';
import { useState } from 'react';

interface SidebarAvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  user: string;
  className?: string;
}

export default function SidebarAvatar({
  src = 'https://github.com/leerob.png',
  alt = '@leerob',
  fallback = 'LR',
  user,
  className,
}: SidebarAvatarProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        'flex cursor-pointer items-center space-x-2 pl-4 text-muted-foreground',
        className,
      )}
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
          <AvatarImage src={src} alt={alt} />
          <AvatarFallback>{fallback}</AvatarFallback>
        </AvatarUI>
      </div>
      <div
        className={cn(
          '-translate-x-2 w-0 whitespace-nowrap text-sm opacity-0 transition-all duration-200 ease-in-out',
          'group-hover:w-auto group-hover:translate-x-0 group-hover:opacity-100',
          isHovered ? 'text-primary' : 'text-text-secondary',
        )}
      >
        {user}
      </div>
    </div>
  );
}
