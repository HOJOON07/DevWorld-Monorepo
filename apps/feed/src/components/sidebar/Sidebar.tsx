import { cn } from '@devworld/ui';
import { ReactNode } from 'react';
import { SidebarProvider } from './context';
import SidebarContent from './SidebarContent';
import SidebarFooter from './SidebarFooter';
import SidebarHeader from './SidebarHeader';
import SidebarItem from './SidebarItem';

interface SidebarProps {
  children: ReactNode;
  className?: string;
  defaultActive?: string;
}

function SidebarRoot({ children, className, defaultActive }: SidebarProps) {
  return (
    <SidebarProvider defaultActive={defaultActive}>
      <div
        className={cn(
          'group fixed top-0 bottom-0 left-0 z-[100] flex w-[68px] flex-col justify-between py-4 transition-all duration-300 ease-in-out',
          className
        )}
      >
        {children}
      </div>
    </SidebarProvider>
  );
}

// Compound Components
const Sidebar = Object.assign(SidebarRoot, {
  Header: SidebarHeader,
  Content: SidebarContent,
  Footer: SidebarFooter,
  Item: SidebarItem,
});

export default Sidebar;