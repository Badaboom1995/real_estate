import React, { useEffect, useRef, useState } from 'react';
import arrowDown from '@/app/(main)/assets/arrow-down.svg';
import Image from 'next/image';
import cn from 'classnames';
import { useFormContext, useWatch } from 'react-hook-form';
import { TripleCheckbox } from '@/components/Forms/TripleCheckbox';
import { Group } from '@/app/(search)/search/types';

type TripleCheckbox = 'not' | 'partly' | 'fully';

// todo any
export const TwoLevelSelect: React.FC<any> = (props: {
  methods: any;
  data: Group[];
  name: string;
  label?: string;
  placeholder?: string;
  className: string;
}) => {
  const { methods, data } = props;
  const { register } = useFormContext();
  const results = useWatch();
  const { className, name } = props;
  const [expandedGroup, setExpandedGroup] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const selected = results[name] || [];
  const parents = data.map((item) => item.parent);
  const toggleGroup = (index: number) => {
    setExpandedGroup(expandedGroup === index ? null : index);
  };

  const allSelected = (item: Group) =>
    item.children.every((child: string) => selected.includes(child));
  const someSelected = (item: Group) =>
    item.children.some((child) => selected.includes(child));
  const noneSelected = (item: Group) =>
    !item.children.some((child) => selected.includes(child));

  const getState = (item: Group): TripleCheckbox => {
    let state: TripleCheckbox = 'not';
    if (allSelected(item) || selected.includes(item.parent)) {
      state = 'fully';
    }
    if (someSelected(item) && !allSelected(item)) {
      state = 'partly';
    }
    if (noneSelected(item) && !selected.includes(item.parent)) {
      state = 'not';
    }
    return state;
  };

  const toggleSelected = (item: string) => {
    const selectedValues = methods.getValues(name) || [];
    const isChecked = !!selected?.includes(item);
    const isItemParent = parents.includes(item);
    let targetValues: string[] = [item];
    const parent = data.find((group) => group.children.includes(item));
    if (isItemParent) {
      const children =
        data.find((group) => group.parent === item)?.children || [];
      targetValues.push(...children);
      targetValues = targetValues.filter((value) => value !== item);
    }
    if (
      parent &&
      parent.children.every((child) =>
        [item, ...selectedValues].includes(child),
      )
    ) {
      targetValues.push(parent.parent);
    }
    targetValues = [...new Set(targetValues)];
    isChecked
      ? methods.setValue(
          name,
          selectedValues.filter((item: string) => !targetValues.includes(item)),
        )
      : methods.setValue(name, [...selectedValues, ...targetValues]);
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
      <label className="block text-gray-700 text-[14px]">{props.label}</label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className={`w-full flex outline-0 justify-between truncate items-center bg-white border rounded-[8px] shadow-sm px-4 py-[14px] mt-2 mr-4 text-left focus:outline-none focus:border-blue-500 ${
          isOpen ? 'border-blue-500' : 'border-gray-300'
        }`}
      >
        <span className="truncate">
          {selected?.length > 0
            ? selected?.join(', ')
            : props.placeholder || 'Select...'}
        </span>
      </button>
      {isOpen && (
        <div className="w-[300px] absolute z-10 max-h-[500px] translate-y-[5px] rounded-md mt-1 bg-white border border-primary overflow-y-scroll">
          {data.map((item, index) => (
            <div key={item.parent}>
              <div className="flex justify-between items-center p-[16px] p-[14px] border-b border-gray-200">
                <div>
                  <TripleCheckbox label={item.parent} state={getState(item)}>
                    <input
                      type="checkbox"
                      value={item.parent}
                      className="hidden"
                      {...register(name, {
                        value: [],
                        onChange: (e) => {
                          toggleSelected(e.target.value);
                        },
                      })}
                    />
                  </TripleCheckbox>
                </div>
                {!!item.children.length && (
                  <button
                    type="button"
                    onClick={() => toggleGroup(index)}
                    className="text-sm text-gray-500 pr-2"
                  >
                    <Image
                      src={arrowDown}
                      alt={'arrowDown'}
                      className={cn({
                        'rotate-180': expandedGroup === index,
                      })}
                    />
                  </button>
                )}
              </div>
              {item.children.map((child) => (
                <div
                  key={child}
                  className={`flex items-center p-2 pl-8 border-b border-gray-200 ${
                    expandedGroup !== index && 'hidden'
                  }`}
                >
                  <TripleCheckbox
                    label={child}
                    state={selected.includes(child) ? 'fully' : 'not'}
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      value={child}
                      {...register(name)}
                      onChange={() => toggleSelected(child)}
                    />
                  </TripleCheckbox>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
