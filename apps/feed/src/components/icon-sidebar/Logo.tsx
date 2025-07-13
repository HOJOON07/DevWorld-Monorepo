import DevWorldLogo from '../../assets/logo-image/DevWorldLogo.png';
export default function Logo() {
  return (
    <div className='cursor-pointer pl-5'>
      <img src={DevWorldLogo} alt='DevWorld Logo' className='size-8' />
    </div>
  );
}
