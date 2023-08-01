'use client';
import cn from 'classnames';
import Image from 'next/image';
import { colors } from '@/consts';

type ButtonProps = {
  variant?: 'primary' | 'transparent' | 'text';
  color?: 'grey' | 'default' | 'white';
  size?: 'base' | 'md' | 'sm';
  children?: React.ReactNode;
  className?: string;
  iconLeft?: string;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
};

const Button: React.FC<ButtonProps> = (props) => {
  const {
    variant = 'primary',
    size = 'base',
    color = 'default',
    children,
    className,
    iconLeft,
    loading,
    onClick,
    type,
  } = props;

  const colorStyles = {
    default: {
      primary: 'bg-primary border-primary text-white hover:bg-blue-700',
      transparent:
        'text-primary border-primary bg-transparent hover:bg-blue-100',
      text: 'text-blue-600',
    },
    grey: {
      primary: 'bg-gray-600 text-white hover:bg-gray-700',
      transparent: 'text-slate-600 border-slate-600 hover:bg-gray-100',
      text: 'text-gray-600',
    },
    white: {
      primary: 'bg-white text-slate-900 hover:bg-gray-200',
      transparent: 'text-white border-white',
      text: 'text-gray-600',
    },
  };

  const sizeStyles = {
    base: 'py-[14px] px-[24px] rounded-[8px] text-base line-height-[28px] font-semibold',
    sm: 'py-[6px] px-[16px] rounded-[6px] text-sm line-height-[20px] font-semibold',
    md: 'py-[12px] px-[24px] rounded-[6px] text-base line-height-[24px] font-semibold',
  };

  return (
    <button
      onClick={onClick}
      disabled={loading}
      type={type}
      className={cn(
        className,
        'flex gap-[8px] text-black items-center disabled:opacity-50 border items-center',
        sizeStyles[size],
        colorStyles[color][variant],
      )}
    >
      {iconLeft && <Image src={iconLeft} alt="Picture of the author" />}
      <span>{loading ? 'Loading...' : children}</span>
    </button>
  );
};

export default Button;
