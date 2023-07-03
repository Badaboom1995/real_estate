import React from 'react';

type TextProps = {
  type: 'h1' | 'h2' | 'h3' | 'text' | 'paragraph' | 'info' | 'hero';
  children: React.ReactNode;
  className?: string;
};

export const Typography: React.FC<TextProps> = ({
  type,
  children,
  className,
}) => {
  switch (type) {
    case 'hero':
      return (
        <h1
          className={`text-3xl leading-[4rem] line-he font-[600] ${className}`}
        >
          {children}
        </h1>
      );
    case 'h1':
      return <h1 className={`text-2xl font-[600] ${className}`}>{children}</h1>;
    case 'h2':
      return <h2 className={`text-xl font-[600] ${className}`}>{children}</h2>;
    case 'h3':
      return <h3 className={`text-lg font-[600] ${className}`}>{children}</h3>;
    case 'paragraph':
      return (
        <p className={`text-base text-[#4E4B66] leading-8 ${className}`}>
          {children}
        </p>
      );
    case 'text':
      return (
        <span className={`text-base text-[#14142B] ${className}`}>
          {children}
        </span>
      );
    case 'info':
      return (
        <small className={`text-base text-[#6E7191] ${className}`}>
          {children}
        </small>
      );
    default:
      return <p className={className}>{children}</p>;
  }
};
