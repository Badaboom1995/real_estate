import { useEffect, useState } from 'react';
import { Range, getTrackBackground } from 'react-range';
import { useFormContext } from 'react-hook-form';

interface IPriceRange {
  rightBorder: number;
  methods: any;
}

export const PriceRange: React.FC<IPriceRange> = (props) => {
  const { register, getValues } = useFormContext();
  const { rightBorder, methods } = props;
  const [min, setMin] = useState(getValues('minPrice') || 0);
  const [max, setMax] = useState(getValues('maxPrice') || rightBorder);

  const setMinPrice = (value: number) => {
    if (value < 0) return 0;
    if (value > max) return max;
    return value;
  };
  const setMaxPrice = (value: number) => {
    if (value > rightBorder) return rightBorder;
    if (value < min) return min + 5;
    return value;
  };

  return (
    <div className="w-[390px] p-[24px]">
      <div className="flex justify-between mb-[8px]">
        <span>Price</span>
        <span>USD</span>
      </div>
      <div className="flex space-x-3 mb-[24px]">
        <div className="flex flex-col w-1/2">
          <span className="text-[14px] text-[#6E7191] mb-[4px]">From</span>
          <input
            {...register('minPrice')}
            className="border border-gray-400 rounded-md px-3 py-2 w-full"
            type="text"
            placeholder="Min price"
            onChange={(e) => setMin(Math.floor(Number(e.target.value)))}
          />
        </div>
        <div className="flex flex-col w-1/2">
          <span className="text-[14px] text-[#6E7191] mb-[4px]">To</span>
          <input
            {...register('maxPrice')}
            className="border border-gray-400 rounded-md px-3 py-2 w-full"
            type="text"
            placeholder="Max price"
            onChange={(e) => setMax(Math.floor(Number(e.target.value)))}
          />
        </div>
      </div>
      {/*<Range*/}
      {/*  values={[setMinPrice(min), setMaxPrice(max)]}*/}
      {/*  step={5}*/}
      {/*  min={0}*/}
      {/*  max={rightBorder}*/}
      {/*  onChange={(values) => {*/}
      {/*    methods.setValue('minPrice', `${values[0]}`);*/}
      {/*    methods.setValue('maxPrice', `${values[1]}`);*/}
      {/*    setMin(values[0]);*/}
      {/*    setMax(values[1]);*/}
      {/*  }}*/}
      {/*  renderTrack={({ props, children }) => (*/}
      {/*    <div*/}
      {/*      onMouseDown={props.onMouseDown}*/}
      {/*      onTouchStart={props.onTouchStart}*/}
      {/*      style={{*/}
      {/*        ...props.style,*/}
      {/*        height: '6px',*/}
      {/*        width: '100%',*/}
      {/*        backgroundColor: '#ccc',*/}
      {/*      }}*/}
      {/*      className="rounded-full"*/}
      {/*    >*/}
      {/*      <div*/}
      {/*        ref={props.ref}*/}
      {/*        style={{*/}
      {/*          height: '5px',*/}
      {/*          width: '100%',*/}
      {/*          borderRadius: '4px',*/}
      {/*          background: getTrackBackground({*/}
      {/*            values: [setMinPrice(min), setMaxPrice(max)],*/}
      {/*            colors: ['#ccc', '#548BF4', '#ccc'],*/}
      {/*            min: 0,*/}
      {/*            max: rightBorder,*/}
      {/*          }),*/}
      {/*        }}*/}
      {/*        className="rounded-full"*/}
      {/*      >*/}
      {/*        {children}*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  )}*/}
      {/*  renderThumb={({ props }) => (*/}
      {/*    <div*/}
      {/*      {...props}*/}
      {/*      style={{*/}
      {/*        ...props.style,*/}
      {/*        height: '24px',*/}
      {/*        width: '24px',*/}
      {/*      }}*/}
      {/*      className={`rounded-full cursor-pointer bg-primary `}*/}
      {/*    />*/}
      {/*  )}*/}
      {/*/>*/}
    </div>
  );
};
