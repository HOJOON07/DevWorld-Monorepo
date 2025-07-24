import ProfileContent from './ProfileContent';

// TODO: 실제 사용자 데이터 API 연동 필요
export default function ProfileContainer() {
  // 임시 mock 데이터 - 실제로는 사용자 정보 API 호출해야 함
  const mockUser = {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: undefined,
    bio: 'Full-stack developer passionate about creating amazing user experiences. Love working with React, Node.js, and modern web technologies.',
    location: 'San Francisco, CA',
    joinedAt: '2023-01-15T00:00:00Z',
  };

  const mockStats = {
    postsCount: 42,
    followersCount: 1250,
    followingCount: 180,
    likesCount: 3420,
  };

  return <ProfileContent user={mockUser} stats={mockStats} />;
}