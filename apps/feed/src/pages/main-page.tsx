import { House, Pencil } from '@devworld/ui';
import DevWorldLogo from '../assets/logo-image/DevWorldLogo.png';
import FeedCard from '../components/feed/Card';
import FeedHeader from '../components/feed/Header';
import SidePannel from '../components/side-pannel/SidePannel';
import FeedSidebar from '../components/sidebar';

export default function MainPage() {
  return (
    <div className='relative min-h-svh justify-between bg-gray-50'>
      <FeedSidebar />
      <div className='ml-20 flex pr-1'>
        {/* Feed Content */}
        <main className='flex-1'>
          <FeedHeader />
          <div className='mx-auto flex max-w-[640px] flex-col gap-8'>
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
