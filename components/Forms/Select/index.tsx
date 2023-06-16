'use client';
import { useState, useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import Image from 'next/image';
import arrowDown from '@/assets/arrow-down.svg';

type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  name: string;
  options: Option[];
  label?: string;
  multiple?: boolean;
  className?: string;
  iconLeft?: string;
};

const Select: React.FC<SelectProps> = (props) => {
  const { name, label, options, multiple, className, iconLeft } = props;

  const { register } = useFormContext();
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (value: string) => {
    if (multiple) {
      setSelectedValues((prevSelectedValues) => {
        const isSelected = prevSelectedValues.includes(value);
        if (isSelected) {
          return prevSelectedValues.filter((val) => val !== value);
        } else {
          return [...prevSelectedValues, value];
        }
      });
    } else {
      setSelectedValues([value]);
      setIsOpen(false);
    }
  };

  const handleToggleOptions = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
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
          className="w-full flex justify-between items-center bg-white border border-gray-300 rounded-[8px] shadow-sm px-4 py-[14px] mt-2 mr-4 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onClick={handleToggleOptions}
        >
          {iconLeft && <img src={iconLeft} />}
          {multiple && selectedValues.length > 0
            ? selectedValues
                .map(
                  (value) =>
                    options.find((option) => option.value === value)?.label,
                )
                .join(', ')
            : options.find((option) => option.value === selectedValues[0])
                ?.label || 'Select an option'}
          <Image src={arrowDown} alt={'arrowDown'} />
        </button>
        {isOpen && (
          <div className="absolute z-10 w-full bg-white shadow-md rounded-md mt-1">
            {options.map((option) => (
              <label
                key={option.value}
                className="flex items-center py-2 px-4 cursor-pointer"
              >
                <input
                  type={multiple ? 'checkbox' : 'radio'}
                  value={option.value}
                  checked={selectedValues.includes(option.value)}
                  {...register(name)}
                  onChange={() => handleOptionClick(option.value)}
                  className="form-checkbox h-5 w-5 text-blue-500"
                />
                <span className="ml-2">{option.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;
