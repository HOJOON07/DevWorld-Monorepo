import FeedCard from '../feed/Card';
import IconSidebar from '../icon-sidebar/Sidebar';
import SidePannel from '../side-pannel/SidePannel';

export default function PageLayout() {
  return (
    <div className='relative min-h-svh justify-between bg-gray-50'>
      <IconSidebar />
      <div className='ml-20 flex pr-1'>
        <main className='flex-1'>
          <div className='mx-auto max-w-[640px]'>
            <FeedCard />
            <FeedCard />
            <FeedCard />
            <FeedCard />
            <FeedCard />
          </div>
        </main>
        <aside className='sticky top-0 h-screen w-96 flex-shrink-0 overflow-y-auto'>
          <SidePannel />
        </aside>
      </div>
    </div>
  );
}
