import cn from 'classnames';
import Image from 'next/image';
import propertyImage from './assets/property.jpg';
import { strings } from '@/utils/strings';
import Link from 'next/link';

interface PropertyCardProps {
  containerClassName?: string;
  property: any;
  title: string;
  image?: string;
  price: string;
  address: string;
  features: string;
}

export function PropertyCard(props: PropertyCardProps) {
  const { containerClassName } = props;
  const {
    title,
    address,
    image = propertyImage,
    features,
    price,
    property,
  } = props;

  const containerClasses = cn('bg-white', containerClassName);

  return (
    <div className={containerClasses}>
      {image && (
        <div className="h-[180px] overflow-hidden mb-4">
          <Link href={`property/${property?.id}`}>
            <Image
              src={image}
              width={300}
              height={200}
              alt={title}
              className="h-full w-full object-cover mb-4 rounded"
            />
          </Link>
        </div>
      )}
      <h2 className="text-xl font-bold mb-[4px] w-full overflow-hidden overflow-ellipsis whitespace-nowrap">
        {title}
      </h2>
      <p className="text-gray-400 text-sm mb-[8px] text-[14px]">{address}</p>
      <p className="text-gray-600 mb-[8px]">{features}</p>
      <p className="text-gray-900 font-medium text-[18px]">
        {price ? `$ ${strings.addSpaces(price)}` : 'Unknown price'}
      </p>
    </div>
  );
}
