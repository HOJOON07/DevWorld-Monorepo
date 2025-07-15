import { ReactNode } from 'react';
import SidebarAvatar from './SidebarAvatar';

interface SidebarFooterProps {
  children: ReactNode;
}

function SidebarFooterRoot({ children }: SidebarFooterProps) {
  return <div className='self-start'>{children}</div>;
}

// Compound Components
const SidebarFooter = Object.assign(SidebarFooterRoot, {
  Avatar: SidebarAvatar,
});

export default SidebarFooter;
