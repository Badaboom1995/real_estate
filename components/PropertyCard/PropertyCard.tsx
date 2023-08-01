import cn from 'classnames';
import Image from 'next/image';
import defaultImage from './assets/property.jpg';
import { strings } from '@/utils/strings';
import Link from 'next/link';

interface PropertyCardProps {
  mapRef?: any;
  containerClassName?: string;
  property: any;
}

export function PropertyCard(props: PropertyCardProps) {
  const { containerClassName } = props;
  const { property } = props;
  const {
    name = 'Property Name',
    address = 'Property Address',
    features = 'Property Features',
    price_dollar = 'Unknown price',
    pictures = [],
    city = 'Unknown city',
    country = 'Unknown country',
    type = 'Unknown type',
    bedrooms = '',
    bathrooms = '',
    internal_area_ft = '',
    external_area_ft = '',
  } = property || {};
  const containerClasses = cn('bg-white', containerClassName);

  const getFeatures = (features: {
    type: string;
    bathrooms: string;
    bedrooms: string;
    internal_area_ft: string;
    external_area_ft: string;
  }) => {
    let featuresString = '';
    if (features.type) featuresString = features.type;
    if (features.bathrooms) featuresString += ` • ${features.bathrooms} ba`;
    if (features.bedrooms) featuresString += ` • ${features.bedrooms} bds`;
    if (features.internal_area_ft || features.external_area_ft) {
      const totalArea = features.internal_area_ft + features.external_area_ft;
      featuresString += ` • ${totalArea} Sq Ft`;
    }
    return featuresString;
  };

  const featuresString = getFeatures({
    type,
    bathrooms,
    bedrooms,
    internal_area_ft,
    external_area_ft,
  });
  return (
    <div className={containerClasses}>
      <div className="h-[180px] overflow-hidden mb-[16px]">
        <Link href={`property/${property?.id}`}>
          <Image
            src={pictures[0] || defaultImage}
            width={300}
            height={200}
            alt={name}
            className="h-full w-full object-cover mb-4 rounded"
          />
        </Link>
      </div>
      <div className="p-[16px] pt-0 text-left">
        <h2 className="text-lg font-medium mb-[4px] w-full overflow-hidden overflow-ellipsis whitespace-nowrap">
          {name}
        </h2>
        <p className="text-gray-400 text-sm mb-[8px] text-[14px]">{`${
          city || ''
        }, ${country}`}</p>
        <p className="text-gray-600 mb-[8px] truncate">{featuresString}</p>
        <p className="text-gray-900 font-medium text-[18px]">
          {price_dollar
            ? `$ ${strings.addSpaces(price_dollar)}`
            : 'Unknown price'}
        </p>
      </div>
    </div>
  );
}
