import { AvatarFallback, AvatarImage, Avatar as AvatarUI } from '@devworld/ui';
export default function Avatar() {
  return (
    <div className='group/avatar flex cursor-pointer items-center space-x-2 pl-4'>
      <div className='group'>
        <AvatarUI>
          <AvatarImage src='https://github.com/leerob.png' alt='@leerob' />
          <AvatarFallback>LR</AvatarFallback>
        </AvatarUI>
      </div>
      <div className='-translate-x-2 w-0 whitespace-nowrap text-sm opacity-0 transition-all duration-200 ease-in-out group-hover:w-auto group-hover:translate-x-0 group-hover:text-text-secondary group-hover:opacity-100'>
        Guest
      </div>
    </div>
  );
}
