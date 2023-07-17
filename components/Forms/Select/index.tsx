'use client';
import { useState, useEffect, useRef, useContext } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import Image from 'next/image';
import arrowDown from '@/assets/arrow-down.svg';
import { TripleCheckbox } from '@/components/Forms/TripleCheckbox';
import { StoreContext } from '@/stores/StoreProvider';

type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  name: string;
  options?: Option[];
  content?: React.ReactElement;
  label?: string;
  title?: string;
  placeholder?: string;
  multiple?: boolean;
  className?: string;
  iconLeft?: string;
};

const Select: React.FC<SelectProps> = (props) => {
  const { name, label, options, multiple, className, iconLeft, content } =
    props;
  const { SearchPageStore } = useContext(StoreContext);
  const { register, getValues } = useFormContext();
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const results = useWatch();
  const selected = results[name] || [];

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

  useEffect(() => {
    // SearchPageStore.setFilters(getValues());
  }, [isOpen]);

  return (
    <div ref={selectRef} className={`relative ${className}`}>
      <label className="block text-gray-700 text-[14px]">{label}</label>
      <div className="relative">
        <button
          type="button"
          className={`${
            isOpen ? 'border-blue-500' : 'border-gray-300'
          } truncate w-full flex justify-between items-center bg-white border rounded-[8px] outline-none shadow-sm px-4 py-[14px] mt-2 mr-4 text-left focus:outline-none  focus:border-blue-500`}
          onClick={handleToggleOptions}
        >
          {iconLeft && <img src={iconLeft} />}
          {multiple && selected.length > 0
            ? selected.join(', ')
            : options?.find((option) => option.value === selectedValues[0])
                ?.label ||
              props.placeholder ||
              'Any'}
          <Image src={arrowDown} alt={'arrowDown'} />
        </button>
        {isOpen && content && (
          <div className="absolute z-10 bg-white shadow-md rounded-md mt-2 border border-[#D9DBE9]">
            {content}
          </div>
        )}
        {isOpen && !content && (
          <div className="absolute z-10 w-full bg-white shadow-md rounded-md mt-2 border border-[#D9DBE9]">
            {options?.map((option) => (
              <TripleCheckbox
                key={option.value}
                label={option.label}
                state={selected?.includes(option.value) ? 'fully' : 'not'}
                className={'flex items-center py-2 px-4 cursor-pointer w-full'}
              >
                <input
                  type={multiple ? 'checkbox' : 'radio'}
                  value={option.value}
                  {...register(name)}
                  className="hidden"
                />
              </TripleCheckbox>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;
