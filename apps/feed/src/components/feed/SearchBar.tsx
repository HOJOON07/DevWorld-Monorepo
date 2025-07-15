import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

const placeholders = [
  "What's the first rule of Fight Club?",
  'Who is Tyler Durden?',
  'Where is Andrew Laeddis Hiding?',
  'Write a Javascript method to reverse a string',
  'How to assemble your own PC?',
];

export default function SearchBar() {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);

  const intervalRef = useRef<number | null>(null);
  const startAnimation = () => {
    intervalRef.current = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 3000);
  };
  const handleVisibilityChange = () => {
    if (document.visibilityState !== 'visible' && intervalRef.current) {
      clearInterval(intervalRef.current); // Clear the interval when the tab is not visible
      intervalRef.current = null;
    } else if (document.visibilityState === 'visible') {
      startAnimation();
    }
  };

  useEffect(() => {
    startAnimation();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [placeholders]);

  return (
    <div className='sticky top-0 z-10 w-full bg-gray-50 pt-4 pb-2'>
      <div className='relative mx-auto h-12 w-full max-w-xl cursor-pointer overflow-hidden rounded-full bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),_0px_1px_0px_0px_rgba(25,28,33,0.02),_0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-200 dark:bg-zinc-800'>
        <button
          type='button'
          className='-translate-y-1/2 absolute top-1/2 right-2 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-50 to-purple-200 transition duration-200 disabled:bg-gray-100 dark:bg-zinc-900 dark:disabled:bg-zinc-800'
        >
          <motion.svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='h-4 w-4 text-white'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M5 12l14 0' />
            <path d='M13 18l6 -6' />
            <path d='M13 6l6 6' />
          </motion.svg>
        </button>

        <div className='pointer-events-none absolute inset-0 flex items-center justify-between rounded-full'>
          <div className='flex-1'>
            <AnimatePresence mode='wait'>
              <motion.p
                initial={{
                  y: 5,
                  opacity: 0,
                }}
                key={`current-placeholder-${currentPlaceholder}`}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                exit={{
                  y: -15,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.3,
                  ease: 'linear',
                }}
                className='truncate pl-4 text-left font-normal text-neutral-500 text-sm sm:pl-12 sm:text-base dark:text-zinc-500'
              >
                {placeholders[currentPlaceholder]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
