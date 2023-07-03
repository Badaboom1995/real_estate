'use client';
import React from 'react';
type CheckboxState = 'fully' | 'partly' | 'not';
import checkboxChecked from '@/assets/check_box.svg';
import checkboxEmpty from '@/assets/check_box_outline_blank.svg';
import Image from 'next/image';

interface TriStateCheckboxProps {
  label: string;
  state: CheckboxState;
  children?: React.ReactNode;
  onChange?: (state: CheckboxState) => void;
  className?: string;
}

const nextState: { [key in CheckboxState]: CheckboxState } = {
  fully: 'not',
  partly: 'fully',
  not: 'partly',
};

export const TripleCheckbox: React.FC<TriStateCheckboxProps> = ({
  label,
  state,
  onChange,
  children,
  className,
}) => {
  const handleChange = () => {
    onChange && onChange(nextState[state]);
  };

  return (
    <label
      className={`inline-flex items-center cursor-pointer font-[16px]  ${
        state === 'not' ? 'text-[#6E7191]' : 'text-gray-600'
      } ${className}`}
      onClick={handleChange}
    >
      {children}
      {state === 'partly' && (
        // <Image src={checkboxEmpty} alt='checkbox empty'/>
        <div className="w-[18px] h-[18px] border-[2px] border-blue-600 bg-blue-300 rounded-[2px] ml-1"></div>
      )}
      {state === 'fully' && (
        <Image src={checkboxChecked} alt="checkbox empty" />
        // <div className="w-4 h-4 border-2 border-blue-600 bg-red-600 rounded"></div>
      )}
      {state === 'not' && (
        <Image src={checkboxEmpty} alt="checkbox empty" />
        // <div className="w-4 h-4 border-2 border-[#6E7191] rounded"></div>
      )}
      <span className="ml-2">{label}</span>
    </label>
  );
};
