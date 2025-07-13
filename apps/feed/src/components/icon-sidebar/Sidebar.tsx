import Avatar from './Avatar';
import Group from './Group';
import Logo from './Logo';

export default function IconSidebar() {
  return (
    <div className='group fixed top-0 bottom-0 left-0 z-[100] flex w-[68px] flex-col justify-between py-4 transition-all duration-300 ease-in-out'>
      <Logo />
      <Group />
      <Avatar />
    </div>
  );
}
