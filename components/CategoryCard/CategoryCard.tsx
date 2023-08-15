import { Typography } from '@/components/Typography';

interface CategoryCardProps {
  containerClassName?: string;
  title: string;
  bg?: string;
  link?: string;
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
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

export function CategoryCard(props: CategoryCardProps) {
  const { title } = props;

  return (
    <div
      className="relative h-[270px] p-[32px] rounded bg-blue-400 flex flex-col-reverse"
      style={{
        backgroundImage: `url(${props.bg})`,
        backgroundPosition: 'center',
      }}
    >
      <Typography type="h2" className="text-white w-full flex justify-between">
        {title}
        <button className="rotate-180 ">
          <Arrow fill="#fff" />
        </button>
      </Typography>
    </div>
  );
}
