'use client';
import cn from 'classnames';
import Image from 'next/image';

type ButtonProps = {
  variant?: 'primary' | 'transparent' | 'text';
  children?: React.ReactNode;
  className?: string;
  iconLeft?: string;
};

const Button: React.FC<ButtonProps> = (props) => {
  const { variant = 'primary', children, className, iconLeft } = props;
  const buttonClass = cn(
    'py-[14px] px-4 rounded-[8px]',
    {
      'bg-primary text-white hover:bg-primary-dark': variant === 'primary',
      'bg-transparent border border-blue-500 text-primary':
        variant === 'transparent',
      'bg-transparent text-primary': variant === 'text',
    },
    className, // Add any additional classes passed to the component
  );

  return (
    <button className={cn(buttonClass, 'flex gap-2 items-center')}>
      {iconLeft && <Image src={iconLeft} alt="Picture of the author" />}
      {children}
    </button>
  );
};

export default Button;
