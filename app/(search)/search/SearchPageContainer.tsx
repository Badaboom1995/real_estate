'use client';
import React, { useContext, useEffect, useState } from 'react';
import { Filters } from '@/components/Filters';
import { observer } from 'mobx-react-lite';
import { PropertyType } from '@/types/Property';
import { StoreProvider, StoreContext } from '@/stores/StoreProvider';
import cn from 'classnames';
import { Group } from '@/app/(search)/search/types';
import { PropertiesList } from '@/components/PropertiesList';
import { Map } from '@/components/Map';
import { PropertySorting } from '@/components/PropertySorting';
import { useUrlParams } from '@/hooks/useSearchParams';
import { ToastContainer } from 'react-toastify';

const headerHeight = 118;

interface ISearchPageView {
  properties?: PropertyType[];
  locations: Group[];
  count: number;
}

const SearchPageView = observer((props: ISearchPageView) => {
  const { properties, count, locations } = props;
  const { SearchPageStore } = useContext(StoreContext);
  const [mapRef, setMapRef] = useState(null);
  const searchPageHeight = `calc(100vh - ${headerHeight}px)`;
  const searchParams = useUrlParams();

  useEffect(() => {
    SearchPageStore.setDict('locations', locations);
    SearchPageStore.setProperties(properties);
    SearchPageStore.setCount(count);
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
            <div className="flex justify-between items-center mb-[24px] pr-[36px]">
              <h2 className="text-[16px] font-medium">
                {SearchPageStore.propertiesCount} properties found
              </h2>
              <PropertySorting />
            </div>
            <PropertiesList mapRef={mapRef} searchParams={searchParams} />
          </div>
          <div
            className={cn('min-w-[50%] transition-all', {
              hidden: !SearchPageStore.isMapVisible,
            })}
          >
            <div className="border grow w-full h-[800px] justify-center items-center bg-indigo-50 text-center -mt-[30px] z-0">
              {!!SearchPageStore.properties.length && (
                <Map
                  propertiesList={SearchPageStore.properties || []}
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
});
// todo any
export const SearchPageContainer = (props: any) => {
  return (
    <StoreProvider>
      <SearchPageView {...props} />
    </StoreProvider>
  );
};
