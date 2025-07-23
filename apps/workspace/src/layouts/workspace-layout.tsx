import { PlateController } from '@devworld/editor';
import { Separator, SidebarInset, SidebarProvider, SidebarTrigger } from '@devworld/ui';
import { Outlet } from 'react-router-dom';
import { WorkspaceBreadcrumb } from '../components/common/workspace-breadcrumb';
import { AppSidebar } from '../components/sidebar/app-sidebar';
import { NavActions } from '../components/sidebar/nav-actions';
import { sidebarData } from '../data/sidebar-data';

export function WorkspaceLayout() {
  return (
    <SidebarProvider>
      <AppSidebar data={sidebarData} />
      <PlateController>
        <SidebarInset className='min-w-0'>
          <header className='flex h-14 shrink-0 items-center gap-2'>
            <div className='flex flex-1 items-center gap-2 px-3'>
              <SidebarTrigger />
              <Separator
                orientation='vertical'
                className='mr-2 shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-4 data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px'
              />
              <WorkspaceBreadcrumb />
            </div>
            <div className='ml-auto px-3'>
              <NavActions />
            </div>
          </header>
          <main className='flex-1 overflow-hidden'>
            <Outlet />
          </main>
        </SidebarInset>
      </PlateController>
    </SidebarProvider>
  );
}
