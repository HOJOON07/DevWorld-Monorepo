import { cn } from '@devworld/ui';

interface Props {
  text: string;
  icon: React.ReactNode;
  isActive: boolean;
  onHover: (text: string) => void;
  onLeave: () => void;
}

export default function Item({ text, icon, isActive, onHover, onLeave }: Props) {
  return (
    <div
      className='group/item flex cursor-pointer items-center py-[9px] text-muted-foreground'
      onMouseEnter={() => onHover(text)}
      onMouseLeave={onLeave}
    >
      <div
        className={cn(
          `mr-[18px] block h-5 w-1 rounded-tr-[32px] rounded-br-[32px] transition-colors duration-200 ${
            isActive ? 'bg-primary' : ''
          }`,
        )}
      ></div>
      <div className='flex items-center space-x-2'>
        <div
          className={`relative transition-colors duration-200 ${isActive ? 'text-primary' : ''}`}
        >
          {icon}
        </div>
        <div
          className={`-translate-x-2 w-0 flex-1 text-nowrap text-[13px] opacity-0 transition-all duration-200 ease-in-out group-hover:w-auto group-hover:translate-x-0 group-hover:opacity-100 ${
            isActive ? 'group-hover:text-primary' : 'group-hover:text-text-secondary'
          }`}
        >
          {text}
        </div>
      </div>
    </div>
  );
}
