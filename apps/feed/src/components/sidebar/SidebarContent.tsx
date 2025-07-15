import { ReactNode } from 'react';

interface SidebarContentProps {
  children: ReactNode;
}

export default function SidebarContent({ children }: SidebarContentProps) {
  return <div className='flex flex-col self-start'>{children}</div>;
}
