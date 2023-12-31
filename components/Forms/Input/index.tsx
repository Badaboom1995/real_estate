'use client';
import React, { useEffect } from 'react';
import cn from 'classnames';
import { useFormContext } from 'react-hook-form';
import Image from 'next/image';

type TextInputProps = {
  name: string;
  label?: string;
  placeholder?: string;
  error?: string;
  isLoading?: boolean;
  iconStart?: JSX.Element;
  iconEnd?: string;
  validation?: any;
  variant?: 'default' | 'transparent';
} & React.InputHTMLAttributes<HTMLInputElement>;

const TextInput: React.FC<TextInputProps> = ({
  name,
  label,
  placeholder,
  error,
  isLoading,
  iconStart,
  iconEnd,
  className,
  validation,
  required = false,
  variant = 'default',
  ...props
}) => {
  const inputClass = cn(
    ' min-h-[54px] border border-gray-300 rounded-[8px] focus:outline-none focus:border-blue-500 text-gray-900 py-2 px-4 block w-full appearance-none leading-normal',
    { 'pl-10': iconStart, 'pr-10': iconEnd, 'border-red-500': error },
    className,
  );
  const inputClassTransparent = cn('bg-transparent', inputClass, 'text-white');
  const inputClassDefault = cn();

  const { register, formState } = useFormContext();

  return (
    <div className="flex flex-col">
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-[500] mb-[4px] text-[#6E7191]"
        >
          {`${label}${required ? '*' : ''}`}
        </label>
      )}
      <div className="relative">
        {iconStart && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {iconStart}
          </div>
        )}
        <input
          placeholder={placeholder || 'Default'}
          className={
            variant === 'transparent' ? inputClassTransparent : inputClass
          }
          {...props}
          {...register(name, { ...validation, required })}
        />
        {iconEnd && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Image src={iconEnd} alt="icon" />
          </div>
        )}
      </div>
      {isLoading && <div className="mt-1">Loading...</div>}
      {formState.errors[name] && (
        <div className="mt-1 text-red-500 text-sm">
          {/* @ts-ignore */}
          {formState.errors[name].message || formState.errors[name].type}
        </div>
      )}
    </div>
  );
};

TextInput.displayName = 'TextInput';

export default TextInput;
