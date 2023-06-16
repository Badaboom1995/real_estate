'use client';
import cn from 'classnames';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MenuItemProps {
  link: string;
  children?: React.ReactNode;
  selected?: boolean;
}

export const MenuItem: React.FC<MenuItemProps> = ({ link, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  if (link) {
    // Render as a single menu item with a link
    return (
      <li>
        <Link
          className={cn(
            { 'font-bold': pathname?.startsWith(link) },
            'text-gray-600 hover:text-gray-800',
          )}
          href={link}
        >
          {children}
        </Link>
      </li>
    );
  }

  // Render as a dropdown menu
  return (
    <li className="relative group">
      <a
        href="#"
        className="text-gray-600 hover:text-gray-800"
        onClick={handleClick}
      >
        {children}
      </a>
      {isOpen && (
        <ul className="absolute left-0 hidden bg-white p-4 mt-2 space-y-2">
          {React.Children.map(children, (child) => (
            <li>{child}</li>
          ))}
        </ul>
      )}
    </li>
  );
};
