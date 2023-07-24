import { Range, getTrackBackground } from 'react-range';
import { useFormContext } from 'react-hook-form';
import { strings } from '@/utils/strings';

interface IPriceRange {
  rightBorder: number;
  methods?: any;
  setTitle: (title: string) => void;
}
const showPricePlaceholder = (min: number, max: number) =>
  `${strings.addCommas(`${min}`)} - ${strings.addCommas(`${max}`)} USD`;

export const PriceRange: React.FC<IPriceRange> = (props) => {
  const { register, watch, setValue } = useFormContext();
  const { rightBorder, setTitle } = props;
  const minPrice = watch('minPrice', 0);
  const maxPrice = watch('maxPrice', rightBorder);

  const getMinPrice = (val: string) => {
    if (!val) return 0;
    const value = Math.floor(Number(val));
    if (isNaN(value)) return 0;
    if (value < 0) return 0;
    if (value > maxPrice) return maxPrice - 500;
    setTitle(showPricePlaceholder(minPrice, maxPrice));
    return value;
  };
  const getMaxPrice = (val: string) => {
    if (!val) return rightBorder;
    const value = Math.floor(Number(val));
    if (isNaN(value)) return rightBorder;
    if (value > rightBorder) return rightBorder;
    if (value < minPrice && value + 500 > rightBorder) return rightBorder;
    if (value < minPrice && value + 500 < rightBorder) {
      return +minPrice + 500;
    }
    setTitle(showPricePlaceholder(minPrice, maxPrice));
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
            {...register('minPrice', { value: '0' })}
            className="border border-gray-400 rounded-md px-3 py-2 w-full"
            type="text"
            placeholder="Min price"
            onBlur={(e) =>
              setValue('minPrice', `${getMinPrice(e.target.value)}`)
            }
          />
        </div>
        <div className="flex flex-col w-1/2">
          <span className="text-[14px] text-[#6E7191] mb-[4px]">To</span>
          <input
            {...register('maxPrice', { value: `${rightBorder}` })}
            className="border border-gray-400 rounded-md px-3 py-2 w-full"
            type="text"
            placeholder="Max price"
            onBlur={(e) =>
              setValue('maxPrice', `${getMaxPrice(e.target.value)}`)
            }
          />
        </div>
      </div>
      <div>
        <Range
          values={[getMinPrice(minPrice), getMaxPrice(maxPrice)]}
          step={5000}
          min={0}
          max={rightBorder}
          onChange={(values) => {
            setValue('minPrice', `${getMinPrice(`${values[0]}`)}`);
            setValue('maxPrice', `${getMaxPrice(`${values[1]}`)}`);
          }}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                height: '5px',
                width: '100%',
                backgroundColor: 'green',
              }}
              className="rounded-full"
            >
              <div
                ref={props.ref}
                style={{
                  height: '5px',
                  width: '100%',
                  borderRadius: '4px',
                  background: getTrackBackground({
                    values: [getMinPrice(minPrice), getMaxPrice(maxPrice)],
                    colors: ['#ccc', '#548BF4', '#ccc'],
                    min: 0,
                    max: rightBorder,
                  }),
                }}
                className="rounded-full"
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '24px',
                width: '24px',
              }}
              className={`rounded-full cursor-pointer bg-primary `}
            />
          )}
        />
      </div>
    </div>
  );
};
