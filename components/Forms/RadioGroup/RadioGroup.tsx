import cn from 'classnames';
import './radioGroupStyles.css';
import { useFormContext } from 'react-hook-form';

interface RadioGroupProps {
  containerClassName?: string;
  groupName: string;
  options: { name: string; value: string }[];
}

export function RadioGroup(props: RadioGroupProps) {
  const { containerClassName, options, groupName } = props;
  const containerClasses = cn(containerClassName, 'flex gap-x-[32px]');
  const { register } = useFormContext();
  return (
    <div className={containerClasses}>
      {options.map(({ name, value }) => (
        <div key={value} className="flex items-center gap-[16px]">
          <input
            id={`${value}-${groupName}`}
            {...register(groupName)}
            type="radio"
            value={value}
            className="hidden radioInput"
          />

          <label
            htmlFor={`${value}-${groupName}`}
            className="inline-block text-base w-[16px] h-[16px] rounded-full border-[2px] border-primary cursor-pointer"
          />
          <label htmlFor={`${value}-${groupName}`} className="font-[400]">
            {name}
          </label>
        </div>
      ))}
    </div>
  );
}
