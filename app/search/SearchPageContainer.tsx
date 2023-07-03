'use client';
import React, { useContext, useEffect } from 'react';
import { Filters } from '@/components/Filters';
import { PropertySorting } from '@/components/PropertySorting';
import { observer } from 'mobx-react-lite';
import { PropertyType } from '@/types/Property';
import { StoreProvider, StoreContext } from '@/stores/StoreProvider';
import cn from 'classnames';
import { Group } from '@/app/search/types';
import { InfinityScroll } from '@/components/InfinityScroll';
import { useRouter } from 'next/router';

const headerHeight = 118;

interface ISearchPageView {
  properties?: PropertyType[];
  locations: Group[];
  count: number;
}

const SearchPageView = observer((props: ISearchPageView) => {
  const { properties, count, locations } = props;
  const { SearchPageStore } = useContext(StoreContext);
  const searchPageHeight = `calc(100vh - ${headerHeight}px)`;

  useEffect(() => {
    SearchPageStore.setDict('locations', locations);
    SearchPageStore.setProperties(properties);
    SearchPageStore.setCount(count);
  }, []);

  return (
    <div style={{ height: searchPageHeight }} className={'overflow-hidden'}>
      <section>
        <Filters />
      </section>
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[24px]">
            Property title ({SearchPageStore.propertiesCount})
          </h2>
          <PropertySorting onToggleMap={SearchPageStore.toggleMap} />
        </div>
        <div className="flex justify-between w-full">
          <InfinityScroll />
          <div
            className={cn('min-w-[50%] transition-all', {
              hidden: !SearchPageStore.isMapVisible,
            })}
          >
            <div className="border grow h-[768px] justify-center items-center bg-indigo-50 text-center">
              map
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
