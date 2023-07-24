import cn from 'classnames';
import { Menu } from '@/components/Menu';
import Button from '@/components/Button';
import logo from '@/app/(main)/assets/logo.svg';
import Link from 'next/link';
import Image from 'next/image';

interface HeaderProps {
  containerClassName?: string;
}

// MainTitle > styles
// SecondaryTitle
// SubTitle
// Text
// TODO
// - storybook

export const Header = () => {
  return (
    <header className="bg-white">
      <div className="min-w-[1200px] max-w-[1440px] px-[48px] m-auto flex items-center justify-between px-4 py-[20px] mb-[24px]">
        <Link href="/">
          <Image src={logo} alt="logo" />
        </Link>
        <Menu />
        <div className="flex items-center">
          <Button
            className="mr-4
        "
            variant="transparent"
          >
            Sell property
          </Button>
          <div className="flex items-center text-white bg-primary w-[40px] h-[40px] rounded-full justify-center">
            AB
          </div>
        </div>
      </div>
    </header>
  );
};
