import { MenuItem } from '@/components/MenuItem';

interface MenuProps {
  containerClassName?: string;
  children?: React.ReactNode;
}

export const Menu: React.FC<MenuProps> = ({ children }) => {
  return (
    <ul className="flex justify-center space-x-6">
      <MenuItem link="/search" selected={true}>
        Buy
      </MenuItem>
      <MenuItem link="/locations">Locations</MenuItem>
      <MenuItem link="/categories">Categories</MenuItem>
      <MenuItem link="/about">About</MenuItem>
      <MenuItem link="/blog">Blog</MenuItem>
    </ul>
  );
};
