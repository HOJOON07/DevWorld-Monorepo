import { useMyInfoState } from '../../../stores/my-info-state';
import ProfileContents from './ProfileContents';

export default function ProfileContainer() {
  const { data: user, isLoading } = useMyInfoState();

  if (isLoading) {
    return <div>loading...</div>;
  }

  return <ProfileContents user={user as any} />;
}
