interface HeaderTitleProps {
  title: string;
  subtitle?: string;
}

export default function HeaderTitle({ title, subtitle }: HeaderTitleProps) {
  return (
    <div className='mt-0'>
      <h1 className='mb-1 font-bold text-gray-900 text-lg leading-tight'>{title}</h1>
      {subtitle && <p className='text-gray-600 text-sm'>{subtitle}</p>}
    </div>
  );
}
