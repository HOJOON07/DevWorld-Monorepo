import { cn } from '@devworld/ui';
import { createContext, ReactNode, useContext } from 'react';
import { globalNavigate } from '../../app/lib/global-navigate';
import { useSidebar } from './context';

// SidebarItem 내부 context
interface SidebarItemContextType {
  id: string;
  isActive: boolean;
}

const SidebarItemContext = createContext<SidebarItemContextType | undefined>(undefined);

const useSidebarItem = () => {
  const context = useContext(SidebarItemContext);
  if (!context) {
    throw new Error('useSidebarItem must be used within a SidebarItem');
  }
  return context;
};

interface SidebarItemProps {
  id: string;
  children: ReactNode;
  isActive?: boolean;
  className?: string;
  routePath: string;
}

function SidebarItemRoot({ id, children, isActive, className, routePath }: SidebarItemProps) {
  const { hoveredItem, setHoveredItem, activeItem } = useSidebar();

  const isItemActive = isActive ?? (hoveredItem ? hoveredItem === id : activeItem === id);

  const handleMouseEnter = () => {
    setHoveredItem(id);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const itemContextValue = {
    id,
    isActive: isItemActive,
  };

  return (
    <SidebarItemContext.Provider value={itemContextValue}>
      <div
        className={cn(
          'group/item flex cursor-pointer items-center py-[9px] text-muted-foreground',
          className,
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => globalNavigate(routePath)}
      >
        {children}
      </div>
    </SidebarItemContext.Provider>
  );
}

interface SidebarItemIndicatorProps {
  className?: string;
}

function SidebarItemIndicator({ className }: SidebarItemIndicatorProps) {
  const { isActive } = useSidebarItem();

  return (
    <div
      className={cn(
        'mr-[18px] block h-5 w-1 rounded-tr-[32px] rounded-br-[32px] transition-colors duration-200',
        isActive && 'bg-primary',
        className,
      )}
    />
  );
}

interface SidebarItemIconProps {
  children: ReactNode;
  className?: string;
}

function SidebarItemIcon({ children, className }: SidebarItemIconProps) {
  const { isActive } = useSidebarItem();

  return (
    <div
      className={cn(
        'relative transition-colors duration-200',
        isActive && 'text-primary',
        className,
      )}
    >
      {children}
    </div>
  );
}

interface SidebarItemTextProps {
  children: ReactNode;
  className?: string;
}

function SidebarItemText({ children, className }: SidebarItemTextProps) {
  const { isActive } = useSidebarItem();

  return (
    <div
      className={cn(
        '-translate-x-2 w-0 flex-1 text-nowrap text-[13px] opacity-0 transition-all duration-200 ease-in-out',
        'group-hover:w-auto group-hover:translate-x-0 group-hover:opacity-100',
        isActive ? 'group-hover:text-primary' : 'group-hover:text-text-secondary',
        className,
      )}
    >
      {children}
    </div>
  );
}

// Compound Components
const SidebarItem = Object.assign(SidebarItemRoot, {
  Indicator: SidebarItemIndicator,
  Icon: SidebarItemIcon,
  Text: SidebarItemText,
});

export default SidebarItem;
