import { cn, LinkIcon, Mail, MapPin } from '@devworld/ui';
import { Path } from 'react-hook-form';
import { ProfileEditType } from '../../../lib/profile-edit-schema';

// 👇 아이콘 컴포넌트에 cn(className) props 타입 명시
type IconComponentType = React.ComponentType<{ className?: string }>;

const ICON_MAP: Partial<Record<Path<ProfileEditType>, IconComponentType>> = {
  location: MapPin,
  email: Mail,
  linkedin: LinkIcon,
  socialEtc: LinkIcon,
};

export type IconList = keyof typeof ICON_MAP;

export default function ProfileIcon({ name, className }: { name: IconList; className?: string }) {
  const Component = ICON_MAP[name];
  if (!Component) return null;
  return <Component className={cn(className)} />;
}
