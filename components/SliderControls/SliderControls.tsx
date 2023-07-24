import arrowDown from '@/app/(main)/assets/arrow-down.svg';
import Image from 'next/image';

interface SliderControlsProps {
  className?: string;
  prev?: () => void;
  next?: () => void;
}

export function SliderControls(props: SliderControlsProps) {
  const { prev, next, className } = props;
  return (
    <div className="flex gap-[8px]">
      <button
        onClick={prev}
        className="w-[44px] h-[44px] border border-[#D9DBE9] rounded-[8px] flex items-center justify-center"
      >
        <Image src={arrowDown} alt="prev" className="rotate-90" />
      </button>
      <button
        onClick={next}
        className="w-[44px] h-[44px] border border-[#D9DBE9] rounded-[8px] flex items-center justify-center"
      >
        <Image src={arrowDown} alt="next" className="-rotate-90" />
      </button>
    </div>
  );
}
