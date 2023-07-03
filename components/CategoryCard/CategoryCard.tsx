import cn from 'classnames';
import { Typography } from '@/components/Typography';
import Image from 'next/image';

interface CategoryCardProps {
  containerClassName?: string;
  title: string;
}

const Arrow = ({ fill }: { fill: string }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="Back Arrow">
      <path
        id="Vector"
        d="M9.71707 5L3 12L9.71707 19M4.26688 12.0317H19.9999"
        stroke={fill}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
  </svg>
);

export function CategoryCard(props: CategoryCardProps) {
  const { containerClassName, title } = props;

  return (
    <div className="relative h-[270px] rounded bg-blue-400">
      <Typography
        type="h2"
        className="absolute bottom-[32px] left-[32px] text-white"
      >
        {title}
      </Typography>
      <button className="rotate-180 absolute right-[32px] bottom-[32px]">
        <Arrow fill="#fff" />
        {/*<Arrow fill="#14142B" />*/}
      </button>
    </div>
  );
}
