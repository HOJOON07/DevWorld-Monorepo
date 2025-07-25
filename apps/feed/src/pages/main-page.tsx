import Feeds from '../components/feed/Feeds';
import SearchBar from '../components/feed/SearchBar';
import SidePanel from '../components/side-pannel/SidePanel';
import FeedSidebar from '../components/sidebar';

export default function MainPage() {
  return (
    <div className='relative min-h-svh justify-between bg-gray-50'>
      <FeedSidebar />
      <div className='ml-20 flex pr-1'>
        <main className='flex-1'>
          <SearchBar />
          <Feeds />
        </main>
        <aside className='sticky top-0 h-screen w-[440px] flex-shrink-0 overflow-y-auto'>
          <SidePanel />
        </aside>
      </div>
    </div>
  );
}
