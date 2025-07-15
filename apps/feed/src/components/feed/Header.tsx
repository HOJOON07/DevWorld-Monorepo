import { SearchBar } from './SearchBar';

export default function FeedHeader() {
  return (
    <div className='sticky top-0 z-10 w-full bg-gray-50 pt-4 pb-2'>
      <SearchBar />
    </div>
  );
}
