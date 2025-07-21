import {
  Button,
  ChevronDown,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  Plus,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SquarePen,
} from '@devworld/ui';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Team } from '../../data/sidebar-data';

interface TeamSwitcherProps {
  teams: Team[];
}

export function TeamSwitcher({ teams }: TeamSwitcherProps) {
  const navigate = useNavigate();
  const [activeTeam, setActiveTeam] = React.useState(teams[0]);

  if (!activeTeam) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <div className='flex items-center justify-between'>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className='w-full px-1.5'>
                <div className='flex aspect-square size-5 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground'>
                  <activeTeam.logo className='size-3' />
                </div>
                <span className='truncate font-semibold'>{activeTeam.name}</span>
                <ChevronDown className='opacity-50' />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <Button
              variant='ghost'
              size='icon'
              className='text-muted-foreground'
              onClick={() => navigate('/write')}
            >
              <SquarePen />
            </Button>
          </div>
          <DropdownMenuContent
            className='w-64 rounded-lg'
            align='start'
            side='bottom'
            sideOffset={4}
          >
            <DropdownMenuLabel className='text-muted-foreground text-xs'>Teams</DropdownMenuLabel>
            {teams.map((team, index) => (
              <DropdownMenuItem
                key={team.name}
                onClick={() => setActiveTeam(team)}
                className='gap-2 p-2'
              >
                <div className='flex size-6 items-center justify-center rounded-sm border'>
                  <team.logo className='size-4 shrink-0' />
                </div>
                {team.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className='gap-2 p-2'>
              <div className='flex size-6 items-center justify-center rounded-md border bg-background'>
                <Plus className='size-4' />
              </div>
              <div className='font-medium text-muted-foreground'>Add team</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
