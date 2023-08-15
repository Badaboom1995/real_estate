'use client';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import defaultImage from './assets/property.jpg';
import { strings } from '@/utils/strings';
import Link from 'next/link';
import { SpaceUnitType } from '@/types/units';
import { useRecoilValue } from 'recoil';
import { spaceUnitState } from '@/stores/recoil/atom';
import { units } from '@/utils/units';
import { propertyService } from '@/services/propertyService';
import Skeleton from 'react-loading-skeleton';

interface PropertyCardProps {
  mapRef?: any;
  containerClassName?: string;
  property: any;
  id?: string;
}

const emptyProperty = {
  name: 'Property Name',
  price_dollar: 'Unknown price',
  pictures: [],
  city: 'Unknown city',
  country: 'Unknown country',
  type: 'Unknown type',
  bedrooms: '',
  bathrooms: '',
  internal_area_ft: '',
  external_area_ft: '',
};

export function PropertyCard(props: PropertyCardProps) {
  const [loading, setLoading] = useState(false);
  const [currentProperty, setCurrentProperty] = useState(emptyProperty);
  const { containerClassName } = props;
  let { property, id } = props;
  const {
    name,
    price_dollar,
    pictures,
    city,
    country,
    type,
    bedrooms,
    bathrooms,
    internal_area_ft,
    external_area_ft,
  } = currentProperty;

  const containerClasses = cn('bg-white', containerClassName);
  const spaceUnit = useRecoilValue(spaceUnitState);
  const getFeatures = (
    features: {
      type: string;
      bathrooms: string;
      bedrooms: string;
      internal_area_ft: string;
      external_area_ft: string;
    },
    applyUnits: { spaceUnit: SpaceUnitType },
  ) => {
    let featuresString = '';
    const area = features.internal_area_ft + features.external_area_ft;
    if (features.type) featuresString = features.type;
    if (features.bathrooms) featuresString += ` • ${features.bathrooms} ba`;
    if (features.bedrooms) featuresString += ` • ${features.bedrooms} bds`;
    if (features.internal_area_ft || features.external_area_ft) {
      const totalArea = strings.addCommas(
        units.getArea(parseInt(area), applyUnits.spaceUnit).toString(),
      );
      featuresString += ` • ${totalArea} ${
        applyUnits.spaceUnit === 'sqft' ? 'Ft²' : 'M²'
      }`;
    }
    return featuresString;
  };

  const featuresString = getFeatures(
    {
      type,
      bathrooms,
      bedrooms,
      internal_area_ft,
      external_area_ft,
    },
    { spaceUnit },
  );

  useEffect(() => {
    if (!property) return;
    setCurrentProperty(property);
  }, [property]);
  //
  useEffect(() => {
    if ((!property || !Object.keys(property).length) && id) {
      setLoading(true);
      propertyService.getProperty(id).then((data) => {
        setCurrentProperty(data);
        setLoading(false);
      });
    }
  }, [id]);

  return (
    <div className={containerClasses}>
      <div className="h-[180px] overflow-hidden mb-[16px]">
        <Link
          href={`property/${property?.id || id}`}
          className={loading ? '-mt-[10px] block' : ''}
        >
          {loading ? (
            <Skeleton height={220} style={{ borderRadius: '16px' }} />
          ) : (
            <Image
              src={(pictures && pictures[0]) || defaultImage}
              width={300}
              height={200}
              alt={name}
              className="h-full w-full object-cover mb-4 rounded"
            />
          )}
        </Link>
      </div>
      <div className="p-[16px] pt-0 text-left">
        <h2 className="text-lg font-medium mb-[4px] w-full overflow-hidden overflow-ellipsis whitespace-nowrap">
          {loading ? <Skeleton /> : name}
        </h2>
        <p className="text-gray-400 text-sm mb-[8px] text-[14px]">
          {loading ? <Skeleton /> : `${city + ',' || ''} ${country}`}
        </p>
        <p className="text-gray-600 mb-[8px] truncate">
          {loading ? <Skeleton /> : featuresString}
        </p>
        <p className="text-gray-900 font-medium text-[18px]">
          {loading ? (
            <Skeleton />
          ) : price_dollar ? (
            `$ ${strings.addCommas(price_dollar)}`
          ) : (
            'Unknown price'
          )}
        </p>
      </div>
    </div>
  );
}
