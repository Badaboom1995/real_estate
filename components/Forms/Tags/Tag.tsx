import React from 'react';

type TagProps = {
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  name: string;
};

const Tag = ({ value, checked, onChange, name }: TagProps) => {
  const id = `tag-${value}`;

  return (
    <React.Fragment>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={() => onChange(value)}
        style={{ display: 'none' }}
        name={name}
      />
      <label
        htmlFor={id}
        className={`m-1 px-3 py-1 rounded border border-blue-500 ${
          checked ? 'bg-blue-500 text-white' : 'bg-white'
        }`}
      >
        {value}
      </label>
    </React.Fragment>
  );
};

export default Tag;
