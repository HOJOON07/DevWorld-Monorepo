import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

type TextElement =
  | 'span'
  | 'p'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'small'
  | 'code'
  | 'blockquote';

const textVariants = cva('', {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance',
      h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
      p: 'leading-7',
      blockquote: 'mt-6 border-l-2 pl-6 italic',
      lead: 'text-muted-foreground text-xl',
      large: 'text-lg font-semibold',
      small: 'text-sm leading-none font-medium',
      muted: 'text-muted-foreground text-sm',
    },
  },
  defaultVariants: {
    variant: 'p',
  },
});

type TextProps<T extends TextElement> = {
  as?: T;
  className?: string;
  children: React.ReactNode;
} & VariantProps<typeof textVariants> &
  Omit<React.ComponentPropsWithRef<T>, 'as' | 'className' | 'children'>;

export function Text<T extends TextElement = 'span'>({
  as,
  variant,
  className,
  children,
  ...props
}: TextProps<T>) {
  const Component = (as || 'span') as React.ElementType;
  return (
    <Component className={cn(textVariants({ variant, className }))} {...props}>
      {children}
    </Component>
  );
}
