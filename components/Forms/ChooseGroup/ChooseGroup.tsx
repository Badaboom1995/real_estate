import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import './chooseGroupStyles.css';

interface RadioButtonProps {
  id: string;
  name: string;
  type: 'radio' | 'checkbox';
  label: string;
  value: string;
  disabled?: boolean;
}

const ChooseButton: FC<RadioButtonProps> = ({
  id,
  name,
  label,
  value,
  disabled,
  type,
}) => {
  const { register } = useFormContext();
  return (
    <div className={'choose-group'}>
      <input
        id={id}
        {...register(name)}
        type={type}
        className="hidden"
        value={value}
        disabled={disabled}
      />
      <label
        htmlFor={id}
        className={`flex items-center justify-center p-[14px] rounded-[8px] min-w-[64px] border border-[#D9DBE9] ${
          disabled
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-black cursor-pointer'
        }
     `}
      >
        {label}
      </label>
    </div>
  );
};

interface RadioGroupProps {
  options: { label: string; value: string; disabled?: boolean }[];
  name: string;
  type: 'radio' | 'checkbox';
  label?: string;
}

export const ChooseGroup: FC<RadioGroupProps> = ({
  options,
  name,
  type,
  label,
}) => {
  return (
    <div className="p-[12px]">
      <span className="text-[16px]">{label}</span>
      <div className="flex gap-2 py-4">
        {options.map(({ label, value, disabled }, index) => (
          <ChooseButton
            type={type}
            key={index}
            id={`${name}-${index}`}
            name={name}
            label={label}
            value={value}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
};
