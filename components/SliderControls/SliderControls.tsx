import arrowDown from '@/public/assets/arrow-down.svg';
import Image from 'next/image';

interface SliderControlsProps {
  className?: string;
  variant?: 'primary' | 'transparent' | 'text';
  color?: 'grey' | 'default' | 'white';
  prev?: () => void;
  next?: () => void;
}

export function SliderControls(props: SliderControlsProps) {
  const {
    prev,
    next,
    className,
    variant = 'primary',
    color = 'default',
  } = props;

  const colorStyles = {
    default: {
      primary: 'bg-primary border-primary text-white hover:bg-blue-700',
      transparent:
        'text-primary border-primary bg-transparent hover:bg-blue-100',
      text: 'text-blue-600',
    },
    grey: {
      primary: 'bg-gray-600 text-white hover:bg-gray-700',
      transparent: 'text-slate-600 border-slate-600 hover:bg-gray-100',
      text: 'text-gray-600',
    },
    white: {
      primary: 'bg-white text-slate-900 hover:bg-gray-200',
      transparent: 'text-white border-white',
      text: 'text-gray-600',
    },
  };

  return (
    <div className="flex gap-[8px]">
      <button
        onClick={prev}
        className="w-[44px] h-[44px] border border-[#D9DBE9] rounded-[8px] flex items-center justify-center"
      >
        {color === 'default' && (
          <Image src={arrowDown} alt="next" className="rotate-90" />
        )}
        {color === 'white' && (
          <div className="rotate-90">
            <svg
              width="13"
              height="8"
              viewBox="0 0 13 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.2129 1.65439L6.57078 6.29651L1.92866 1.65439"
                stroke="#fff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        )}
      </button>
      <button
        onClick={next}
        className="w-[44px] h-[44px] border border-[#D9DBE9] rounded-[8px] flex items-center justify-center"
      >
        {color === 'default' && (
          <Image src={arrowDown} alt="next" className="-rotate-90" />
        )}
        {color === 'white' && (
          <div className="-rotate-90">
            <svg
              width="13"
              height="8"
              viewBox="0 0 13 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.2129 1.65439L6.57078 6.29651L1.92866 1.65439"
                stroke="#fff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        )}
      </button>
    </div>
  );
}
