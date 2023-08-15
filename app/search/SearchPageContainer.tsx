'use client';
import React, { useContext, useEffect, useState } from 'react';
import { Filters } from '@/components/Filters';
import { PropertyType } from '@/types/Property';
import cn from 'classnames';
import { PropertiesList } from '@/components/PropertiesList';
import { Map } from '@/components/Map';
import { PropertySorting } from '@/components/PropertySorting';
import { useUrlParams } from '@/hooks/useSearchParams';
import { ToastContainer } from 'react-toastify';
import { propertyService } from '@/services/propertyService';
import { propertiesAtom } from '@/stores/recoil/properties/propAtom';
import { useRecoilState } from 'recoil';

const headerHeight = 118;

interface ISearchPageView {
  properties?: PropertyType[];
  points?: { id: string; lat: string; lon: string }[];
  count: number;
}

export const SearchPageContainer = (props: ISearchPageView) => {
  const {
    properties: defaultProperties,
    count: defaultCount,
    points: defaultPoints,
  } = props;
  const [mapRef, setMapRef] = useState(null);
  const searchPageHeight = `calc(100vh - ${headerHeight}px)`;
  const searchParams = useUrlParams();
  const [propertiesState, setProperties] = useRecoilState(propertiesAtom);
  const { count, points, entities } = propertiesState;

  useEffect(() => {
    if (!defaultProperties) return;
    setProperties({
      count: defaultCount,
      entities: defaultProperties,
      points: defaultPoints,
    });
  }, []);

  return (
    <div style={{ height: searchPageHeight }} className={'overflow-hidden'}>
      <ToastContainer />
      <section>
        <Filters defaultValues={searchParams} />
      </section>
      <section>
        <div className="flex justify-between w-full">
          <div>
            <div className="flex justify-between items-center mb-[24px] pr-[36px] pt-[24px]">
              <h2 className="text-[16px] font-medium">
                {count} properties found
              </h2>
              <PropertySorting />
            </div>
            <PropertiesList mapRef={mapRef} searchParams={searchParams} />
          </div>
          <div
            className={cn('min-w-[50%] transition-all', {
              // hidden: !SearchPageStore.isMapVisible,
            })}
          >
            <div className="border grow w-full h-[800px] justify-center items-center bg-indigo-50 text-center -mt-[30px] z-0">
              {!!points?.length && !!entities?.length && (
                <Map
                  pointsList={points || []}
                  propertiesSelected={entities || []}
                  mapRef={mapRef}
                  setMapRef={setMapRef}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
