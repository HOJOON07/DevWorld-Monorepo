import FeedCard from '../components/feed/Card';
import SearchBar from '../components/feed/SearchBar';
import SidePannel from '../components/side-pannel/SidePannel';
import FeedSidebar from '../components/sidebar';

// 임시 mock 데이터
const mockPosts = [
  {
    id: '1',
    title: 'Design System 2.0 Launch',
    description:
      "Just shipped a major redesign for our design system! After 6 months of research, testing, and iteration, we've created something that's not just beautiful, but truly accessible and scalable.",
    author: {
      name: 'Sarah Chen',
      avatar: '/placeholder.svg?height=40&width=40',
      title: 'Senior Product Designer at Figma • 2nd',
      isVerified: true,
    },
    stats: {
      likes: 247,
      comments: 34,
      shares: 12,
      views: 1200,
    },
    timestamp: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    title: 'React Performance Optimization',
    description:
      "Sharing some advanced React performance optimization techniques that helped us reduce our app's bundle size by 40% and improve loading times significantly.",
    author: {
      name: 'Alex Kim',
      avatar: '/placeholder.svg?height=40&width=40',
      title: 'Frontend Engineer at Netflix • 1st',
      isVerified: false,
    },
    stats: {
      likes: 182,
      comments: 28,
      shares: 8,
      views: 890,
    },
    timestamp: '2024-01-15T08:15:00Z',
  },
  {
    id: '3',
    title: 'React Performance Optimization',
    description:
      "Sharing some advanced React performance optimization techniques that helped us reduce our app's bundle size by 40% and improve loading times significantly.",
    author: {
      name: 'Alex Kim',
      avatar: '/placeholder.svg?height=40&width=40',
      title: 'Frontend Engineer at Netflix • 1st',
      isVerified: false,
    },
    stats: {
      likes: 182,
      comments: 28,
      shares: 8,
      views: 890,
    },
    timestamp: '2024-01-15T08:15:00Z',
  },
  {
    id: '4',
    title: 'React Performance Optimization',
    description:
      "Sharing some advanced React performance optimization techniques that helped us reduce our app's bundle size by 40% and improve loading times significantly.",
    author: {
      name: 'Alex Kim',
      avatar: '/placeholder.svg?height=40&width=40',
      title: 'Frontend Engineer at Netflix • 1st',
      isVerified: false,
    },
    stats: {
      likes: 182,
      comments: 28,
      shares: 8,
      views: 890,
    },
    timestamp: '2024-01-15T08:15:00Z',
  },
];

export default function MainPage() {
  return (
    <div className='relative min-h-svh justify-between bg-gray-50'>
      <FeedSidebar />
      <div className='ml-20 flex pr-1'>
        <main className='flex-1'>
          <SearchBar />
          <div className='mx-auto flex max-w-[640px] flex-col gap-8'>
            {mockPosts.map((post) => (
              <FeedCard key={post.id} data={post} />
            ))}
          </div>
        </main>
        <aside className='sticky top-0 h-screen w-96 flex-shrink-0 overflow-y-auto'>
          <SidePannel />
        </aside>
      </div>
    </div>
  );
}
