export interface ButtonProps {
  children: React.ReactNode;
  className?: string;
}

export const Button = ({ children, className }: ButtonProps) => {
  return (
    <button className={className} type="button">
      {children}
    </button>
  );
};
