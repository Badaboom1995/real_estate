import cn from 'classnames';
import Image from 'next/image';
import propertyImage from './assets/property.jpg';
import { strings } from '@/utils/strings';

interface PropertyCardProps {
  containerClassName?: string;
  title: string;
  image?: string;
  price: string;
  address: string;
  features: string;
}

export function PropertyCard(props: PropertyCardProps) {
  const { containerClassName } = props;
  const { title, address, image = propertyImage, features, price } = props;

  const containerClasses = cn('w-[48%] bg-white', containerClassName);

  return (
    <div className={containerClasses}>
      {image && (
        <div className="h-[180px] overflow-hidden mb-4">
          <Image
            src={image}
            width={300}
            height={200}
            alt={title}
            className="w-full mb-4 rounded-lg"
          />
        </div>
      )}
      <h2 className="text-xl font-bold mb-1 w-full overflow-hidden overflow-ellipsis whitespace-nowrap">
        {title}
      </h2>
      <p className="text-gray-400 text-sm mb-3 text-[14px]">{address}</p>
      <p className="text-gray-600 mb-3">{features}</p>
      <p className="text-gray-900 font-medium text-[18px]">
        {price ? `$ ${strings.addSpaces(price)}` : 'Unknown price'}
      </p>
    </div>
  );
}
