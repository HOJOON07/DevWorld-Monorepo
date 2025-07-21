import {
  FileText,
  MoreHorizontal,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@devworld/ui';

export function NavWorkspaces() {
  // more은 아이템이 몇 개 이상이면 보일 수 있도록 하자.
  return (
    <SidebarGroup className='flex flex-1 flex-col'>
      <SidebarGroupLabel>Workspaces</SidebarGroupLabel>
      <SidebarGroupContent className='flex flex-1 flex-col'>
        <SidebarMenu className='flex-1'>
          <div className='flex-1'>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <FileText />
                <span>Documents api title</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </div>
          <SidebarMenuItem>
            <SidebarMenuButton className='text-sidebar-foreground/70'>
              <MoreHorizontal />
              <span>More</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
