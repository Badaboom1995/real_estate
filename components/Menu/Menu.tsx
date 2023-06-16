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
      <MenuItem link="/sell">Sell</MenuItem>
      <MenuItem link="">Invest</MenuItem>
      <MenuItem link="">About</MenuItem>
      <MenuItem link="">Blog</MenuItem>
    </ul>
  );
};
