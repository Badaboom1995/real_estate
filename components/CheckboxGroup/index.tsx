import React, { useState } from 'react';

interface CheckboxOption {
    value: string;
    label: string;
}

interface CheckboxGroupProps {
    options: CheckboxOption[];
    label: string;
    name: string;
    onChange: (selectedValues: string[]) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ options, label, name, onChange }) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        setSelectedOptions(prevState =>
            prevState.includes(value)
                ? prevState.filter(option => option !== value)
                : [...prevState, value]
        );
    };

    React.useEffect(() => {
        onChange(selectedOptions);
    }, [selectedOptions, onChange]);

    return (
        <div>
            <label>{label}</label>
            {options.map(option => (
                <div key={option.value}>
                    <input
                        type="checkbox"
                        id={`${name}-${option.value}`}
                        value={option.value}
                        checked={selectedOptions.includes(option.value)}
                        onChange={handleChange}
                    />
                    <label htmlFor={`${name}-${option.value}`}>{option.label}</label>
                </div>
            ))}
        </div>
    );
};

export default CheckboxGroup;
