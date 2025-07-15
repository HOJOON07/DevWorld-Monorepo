import { cn } from '@devworld/ui';

interface SidebarLogoProps {
  src: string;
  alt: string;
  text: string;
  className?: string;
}

export default function SidebarLogo({ src, alt, text, className }: SidebarLogoProps) {
  return (
    <div className={cn('flex cursor-pointer items-center pl-5', className)}>
      <img src={src} alt={alt} className='size-8' />
      <p className='-translate-x-2 ml-4 w-0 text-nowrap font-medium text-primary opacity-0 transition-all duration-200 ease-in-out group-hover:w-auto group-hover:translate-x-0 group-hover:opacity-100'>
        {text}
      </p>
    </div>
  );
}
