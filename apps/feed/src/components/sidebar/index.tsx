import { House, LogOut, Pencil } from '@devworld/ui';
import DevWorldLogo from '../../assets/logo-image/DevWorldLogo.png';
import Sidebar from './Sidebar';

export default function FeedSidebar() {
  return (
    <Sidebar defaultActive='feed'>
      <Sidebar.Header>
        <Sidebar.Header.Logo src={DevWorldLogo} alt='DevWorld Logo' text='DevWorld' />
      </Sidebar.Header>

      <Sidebar.Content>
        <Sidebar.Item id='feed' routePath='#'>
          <Sidebar.Item.Indicator />
          <div className='flex items-center space-x-2'>
            <Sidebar.Item.Icon>
              <House />
            </Sidebar.Item.Icon>
            <Sidebar.Item.Text>Feed</Sidebar.Item.Text>
          </div>
        </Sidebar.Item>

        <Sidebar.Item id='workspace' routePath='/workspace'>
          <Sidebar.Item.Indicator />
          <div className='flex items-center space-x-2'>
            <Sidebar.Item.Icon>
              <Pencil />
            </Sidebar.Item.Icon>
            <Sidebar.Item.Text>Workspace</Sidebar.Item.Text>
          </div>
        </Sidebar.Item>

        <Sidebar.Item id='logout' routePath='#'>
          <Sidebar.Item.Indicator />
          <div className='flex items-center space-x-2'>
            <Sidebar.Item.Icon>
              <LogOut />
            </Sidebar.Item.Icon>
            <Sidebar.Item.Text>Logout</Sidebar.Item.Text>
          </div>
        </Sidebar.Item>
      </Sidebar.Content>

      <Sidebar.Footer>
        <Sidebar.Footer.Avatar user='Guest' />
      </Sidebar.Footer>
    </Sidebar>
  );
}
