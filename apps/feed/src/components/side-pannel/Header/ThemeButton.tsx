import { Button, Moon, Sun } from '@devworld/ui';

export default function ThemeButton() {
  return (
    <Button variant='ghost' size='icon' className='cursor-pointer hover:text-green-500'>
      <Sun className='dark:-rotate-90 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:scale-0' />
      <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
    </Button>
  );
}
