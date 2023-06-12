'use client'
import cn from 'classnames';

type ButtonProps = {
    variant?: 'primary' | 'transparent' | 'text';
    children?: React.ReactNode;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className }) => {
    const buttonClass = cn(
        'py-2 px-4 rounded',
        {
            'bg-primary text-white hover:bg-primary-dark': variant === 'primary',
            'bg-transparent text-primary hover:bg-primary hover:text-white': variant === 'transparent',
            'bg-transparent text-primary': variant === 'text'
        },
        className // Add any additional classes passed to the component
    );

    return (
        <button className={buttonClass}>
            {children}
        </button>
    );
};

export default Button;
