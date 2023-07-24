'use client';
import React, { useContext, useEffect, useState } from 'react';
import { Filters } from '@/components/Filters';
import { observer } from 'mobx-react-lite';
import { PropertyType } from '@/types/Property';
import { StoreProvider, StoreContext } from '@/stores/StoreProvider';
import cn from 'classnames';
import { Group } from '@/app/(search)/search/types';
import { InfinityScroll } from '@/components/InfinityScroll';
import { Map } from '@/components/Map';
import { usePathname, useSearchParams } from 'next/navigation';
import { normalizeFilters } from '@/components/Filters/utils/normalizeFilters';
import { paramsToObject } from '@/utils/objectToParams';

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
  const params = useSearchParams();
  const filtersFromURL = normalizeFilters(paramsToObject(params?.entries()));

  useEffect(() => {
    // SearchPageStore.setFilters(filtersFromURL);
    SearchPageStore.setDict('locations', locations);
    SearchPageStore.setProperties(properties);
    SearchPageStore.setCount(count);
  }, []);

  return (
    <div style={{ height: searchPageHeight }} className={'overflow-hidden'}>
      <section>
        <Filters defaultValues={filtersFromURL} />
      </section>
      <section>
        <div className="flex justify-between w-full">
          <div>
            <div className="flex justify-between items-center mt-[16px] mb-[16px]">
              <h2 className="text-[16px] font-medium">
                {SearchPageStore.propertiesCount} properties found
              </h2>
              {/*<button>sort</button>*/}
              {/*<PropertySorting onToggleMap={SearchPageStore.toggleMap} />*/}
            </div>
            <InfinityScroll mapRef={mapRef} />
          </div>
          <div
            className={cn('min-w-[50%] transition-all', {
              hidden: !SearchPageStore.isMapVisible,
            })}
          >
            <div className="border grow w-full h-[650px] justify-center items-center bg-indigo-50 text-center mt-[56px]">
              <Map mapRef={mapRef} setMapRef={setMapRef} />
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
