import { globalNavigate } from '@devworld/event-bus';
import { ReactNode } from 'react';
import SidebarLogo from './SidebarLogo';

interface SidebarHeaderProps {
  children: ReactNode;
}

function SidebarHeaderRoot({ children }: SidebarHeaderProps) {
  return <div className='self-start'>{children}</div>;
}

const SidebarHeader = Object.assign(SidebarHeaderRoot, {
  Logo: SidebarLogo,
});

export default SidebarHeader;
