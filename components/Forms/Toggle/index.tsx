'use client';
import React, { useState } from 'react';
import cn from 'classnames';
import { useFormContext } from 'react-hook-form';

type ToggleProps = {
  name: string;
  label?: string;
  initialValue?: boolean;
  onChange?: (checked: boolean) => void;
};

const Toggle: React.FC<ToggleProps> = ({
  name,
  label,
  initialValue = false,
  onChange,
}) => {
  const [checked, setChecked] = useState(initialValue);
  const { register, watch } = useFormContext();
  const value = watch(name);

  const toggle = () => {
    setChecked(!checked);
    onChange?.(!checked);
  };

  return (
    <label className="cursor-pointer">
      {label && <span className="block text-gray-700 w-100">{label}</span>}
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          {...register(name)}
          // checked={checked}
          // onChange={toggle}
        />
        <div
          className={cn('block bg-gray-600 w-10 h-6 rounded-full', {
            'bg-primary': value,
          })}
        ></div>
        <div
          className={cn(
            'absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out transform',
            { 'translate-x-full': value },
          )}
        ></div>
      </div>
    </label>
  );
};

export default Toggle;
