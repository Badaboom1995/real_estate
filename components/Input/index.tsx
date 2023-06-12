'use client'
import React, { forwardRef, FC } from 'react';
import cn from 'classnames';
import {useFormContext} from "react-hook-form";

type TextInputProps = {
    name: string;
    label?: string;
    placeholder?: string;
    error?: string;
    isLoading?: boolean;
    iconStart?: JSX.Element;
    iconEnd?: JSX.Element;
} & React.InputHTMLAttributes<HTMLInputElement>;

const TextInput:React.FC<TextInputProps> = ({ name, label, placeholder, error, isLoading, iconStart, iconEnd, className, ...props }) => {
        const inputClass = cn(
            "border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-gray-900 py-2 px-4 block w-full appearance-none leading-normal",
            {"pl-10": iconStart, "pr-10": iconEnd, "border-red-500": error},
            className
        );
        const { register } = useFormContext()
        return (
            <div className="flex flex-col">
                {label && (
                    <label htmlFor={name} className="...">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {iconStart && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{iconStart}</div>}
                    <input
                        placeholder={placeholder}
                        className={inputClass}
                        {...props}
                        {...register(name)}
                    />
                    {iconEnd && <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">{iconEnd}</div>}
                </div>
                {isLoading && <div className="mt-1">Loading...</div>}
                {error && <div className="mt-1 text-red-500 text-sm">{error}</div>}
            </div>
        );
    }


TextInput.displayName = 'TextInput';

export default TextInput;
