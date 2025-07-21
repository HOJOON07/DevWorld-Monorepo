import { Sidebar, SidebarContent, SidebarHeader } from '@devworld/ui';
import * as React from 'react';
import type { SidebarData } from '../../data/sidebar-data';
import { NavMain } from './nav-main';
import { NavSecondary } from './nav-secondary';
import { NavWorkspaces } from './nav-workspaces';
import { TeamSwitcher } from './team-switcher';

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  data: SidebarData;
}

export function AppSidebar({ data, ...props }: AppSidebarProps) {
  return (
    <Sidebar className='border-r-0' {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavWorkspaces />
        <NavSecondary items={data.navSecondary} className='mt-auto' />
      </SidebarContent>
    </Sidebar>
  );
}
