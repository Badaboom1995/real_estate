import React from 'react';
import { TripleCheckbox } from '@/components/Forms/TripleCheckbox';
import { useFormContext } from 'react-hook-form';

interface CheckboxOption {
  value: string;
  label: string;
}

interface CheckboxGroupProps {
  options: CheckboxOption[];
  label?: string;
  name: string;
  reversed?: boolean;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  label,
  name,
  reversed,
}) => {
  const { register, watch } = useFormContext();
  const values = watch(name) || [];

  return (
    <div>
      {label && <label>{label}</label>}
      {options.map((option) => (
        <div key={option.value}>
          <TripleCheckbox
            label={option.label}
            state={values?.includes(option.value) ? 'fully' : 'not'}
            className={
              'flex flex-row-reverse justify-between items-center py-[12px] cursor-pointer w-full'
            }
          >
            <input
              type="checkbox"
              value={option.value}
              {...register(name)}
              className="hidden"
            />
          </TripleCheckbox>
        </div>
      ))}
    </div>
  );
};

export default CheckboxGroup;
