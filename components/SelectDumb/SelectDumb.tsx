'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import arrowDown from '@/app/(main)/assets/arrow-down.svg';

type ContentProps =
  | {
      setTitle: (title: string) => void;
      [key: string]: any;
    }
  | any;
type SelectProps = {
  label?: string;
  placeholder?: string;
  className?: string;
  iconLeft?: string;
  iconRight?: string;
  Content: React.FC<ContentProps>;
  contentProps?: Record<string, unknown>;
};

export const SelectDumb: React.FC<SelectProps> = (props) => {
  const {
    label,
    className,
    iconLeft,
    Content,
    placeholder = 'Any',
    contentProps,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const selectRef = useRef<HTMLDivElement>(null);

  const handleToggleOptions = () => {
    setIsOpen((prevState) => !prevState);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={selectRef} className={`relative ${className}`}>
      <label className="block text-gray-700 text-[14px]">{label}</label>
      <div className="relative">
        <button
          type="button"
          className={`${
            isOpen ? 'border-blue-500' : 'border-gray-300'
          } truncate w-full flex justify-between items-center bg-white border rounded-[8px] outline-none shadow-sm px-4 pr-[30px] py-[14px] mt-2 mr-4 text-left focus:outline-none  focus:border-blue-500`}
          onClick={handleToggleOptions}
        >
          {iconLeft && <img src={iconLeft} />}
          {title || placeholder}
          <Image
            className="absolute right-[16px] top-[50%] transform -translate-y-1/2"
            src={arrowDown}
            alt={'arrowDown'}
          />
        </button>
        <div
          className={`absolute z-10 bg-white shadow-md rounded-md mt-2 border border-[#D9DBE9] ${
            !isOpen && 'hidden'
          }`}
        >
          <Content setTitle={setTitle} {...contentProps} />
        </div>
      </div>
    </div>
  );
};
