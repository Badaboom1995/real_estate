import React from 'react';
import { useState } from 'react';
import arrow from '@/public/assets/arrow-blue.svg';
import Image from 'next/image';

interface Props {
  children: string | React.ReactNode;
  maxHeight?: number;
  expandText?: string;
}

export const TextContainer: React.FC<Props> = (props) => {
  const { children, expandText = 'Show more' } = props;
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  return (
    <div className="relative">
      <div
        className={`overflow-hidden mb-4 ${expanded ? 'h-auto' : `h-[190px]`}`}
      >
        {children}
      </div>
      {!expanded ? (
        <button
          className="flex items-center gap-2 bg-white text-primary font-medium text-base px-2 py-1 rounded-sm"
          onClick={toggleExpand}
        >
          <Image src={arrow} alt="arrow-down" />
          <span>{expandText}</span>
        </button>
      ) : (
        <button
          className="flex gap-2 items-center bg-white text-primary font-medium text-base px-2 py-1 rounded-sm"
          onClick={toggleExpand}
        >
          <Image src={arrow} alt="arrow-up" className="rotate-180" />
          Show less
        </button>
      )}
    </div>
  );
};
