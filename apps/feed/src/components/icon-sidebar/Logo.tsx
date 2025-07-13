import DevWorldLogo from '../../assets/logo-image/DevWorldLogo.png';
export default function Logo() {
  return (
    <div className='flex cursor-pointer items-center pl-5'>
      <img src={DevWorldLogo} alt='DevWorld Logo' className='size-8' />
      <p className='-translate-x-2 ml-4 w-0 text-nowrap font-medium text-primary opacity-0 transition-all duration-200 ease-in-out group-hover:w-auto group-hover:translate-x-0 group-hover:opacity-100'>
        DevWorld
      </p>
    </div>
  );
}
