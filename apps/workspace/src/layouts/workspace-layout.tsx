import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Separator,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@devworld/ui';
import { Outlet, useLocation } from 'react-router-dom';
import { AppSidebar } from '../components/sidebar/app-sidebar';
import { NavActions } from '../components/sidebar/nav-actions';
import { sidebarData } from '../data/sidebar-data';

export function WorkspaceLayout() {
  const location = useLocation();
  const getBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);

    if (pathSegments.includes('docs')) {
      return (
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/workspace'>workspace</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href='/workspace/docs'>docs</BreadcrumbLink>
          </BreadcrumbItem>
          {pathSegments[2] && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{pathSegments[2]}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      );
    }

    if (pathSegments.includes('write')) {
      return (
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/workspace'>workspace</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>write</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      );
    }

    return (
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage>workspace</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    );
  };

  return (
    <SidebarProvider>
      <AppSidebar data={sidebarData} />
      <SidebarInset className='min-w-0'>
        <header className='flex h-14 shrink-0 items-center gap-2'>
          <div className='flex flex-1 items-center gap-2 px-3'>
            <SidebarTrigger />
            <Separator
              orientation='vertical'
              className='mr-2 shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-4 data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px'
            />
            <Breadcrumb>{getBreadcrumbs()}</Breadcrumb>
          </div>
          <div className='ml-auto px-3'>
            <NavActions />
          </div>
        </header>
        <main className='flex-1 overflow-hidden'>
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
