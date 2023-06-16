import cn from 'classnames';
import { Menu } from '@/components/Menu';
import Button from '@/components/Button';

interface HeaderProps {
  containerClassName?: string;
}

// MainTitle > styles
// SecondaryTitle
// SubTitle
// Text
// TODO
// - storybook
// - generator +
// - Text component
// - destruct props in component body

export const Header = () => {
  return (
    <header className="flex items-center justify-between px-4 py-8">
      <div className="flex flex-col">
        {/* Your logo component or image goes here */}
        <span className="uppercase ">Caribbean</span>
        <span className="uppercase text-[#979797] text-[12px]">
          Real estate
        </span>
      </div>
      <Menu />
      <div className="flex items-center">
        <Button
          className="mr-4
        "
          variant="transparent"
        >
          Sell property
        </Button>
        <div className="flex items-center bg-blue-400 w-[40px] h-[40px] rounded-full justify-center">
          AB
        </div>
      </div>
    </header>
  );
};
