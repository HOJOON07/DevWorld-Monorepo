// TODO: 실제 User 타입 정의 필요
interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  location?: string;
  joinedAt: string;
}

interface UserStats {
  postsCount: number;
  followersCount: number;
  followingCount: number;
  likesCount: number;
}

interface ProfileContentProps {
  user: UserProfile;
  stats: UserStats;
}

export default function ProfileContent({ user, stats }: ProfileContentProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
  };

  return (
    <div className='space-y-6'>
      {/* Profile Header */}
      <div className='text-center'>
        <div className='mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full bg-gray-200'>
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className='h-full w-full object-cover' />
          ) : (
            <div className='flex h-full w-full items-center justify-center font-medium text-2xl text-gray-400'>
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <h2 className='font-bold text-gray-900 text-xl'>{user.name}</h2>
        <p className='text-gray-600 text-sm'>{user.email}</p>
        {user.location && <p className='mt-1 text-gray-500 text-sm'>📍 {user.location}</p>}
      </div>

      {/* Bio */}
      {user.bio && (
        <div className='border-gray-200 border-t pt-6'>
          <h3 className='mb-2 font-medium text-gray-900 text-sm'>About</h3>
          <p className='text-gray-600 text-sm leading-relaxed'>{user.bio}</p>
        </div>
      )}

      {/* Stats */}
      <div className='border-gray-200 border-t pt-6'>
        <h3 className='mb-4 font-medium text-gray-900 text-sm'>Stats</h3>
        <div className='grid grid-cols-2 gap-4'>
          <div className='text-center'>
            <div className='font-bold text-gray-900 text-lg'>{stats.postsCount}</div>
            <div className='text-gray-500 text-xs'>Posts</div>
          </div>
          <div className='text-center'>
            <div className='font-bold text-gray-900 text-lg'>{stats.likesCount}</div>
            <div className='text-gray-500 text-xs'>Likes</div>
          </div>
          <div className='text-center'>
            <div className='font-bold text-gray-900 text-lg'>{stats.followersCount}</div>
            <div className='text-gray-500 text-xs'>Followers</div>
          </div>
          <div className='text-center'>
            <div className='font-bold text-gray-900 text-lg'>{stats.followingCount}</div>
            <div className='text-gray-500 text-xs'>Following</div>
          </div>
        </div>
      </div>

      {/* Joined Date */}
      <div className='border-gray-200 border-t pt-6'>
        <p className='text-gray-500 text-sm'>Joined {formatDate(user.joinedAt)}</p>
      </div>
    </div>
  );
}
