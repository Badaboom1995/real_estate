'use client';
import React, { useState } from 'react';
import cn from 'classnames';

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
          checked={checked}
          onChange={toggle}
        />
        <div
          className={cn('block bg-gray-600 w-10 h-6 rounded-full', {
            'bg-sky-400': checked,
          })}
        ></div>
        <div
          className={cn(
            'absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out transform',
            { 'translate-x-full': checked },
          )}
        ></div>
      </div>
    </label>
  );
};

export default Toggle;
