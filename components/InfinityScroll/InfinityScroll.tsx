import cn from 'classnames';
import React, { useContext, useRef, useEffect, useState } from 'react';
import { StoreContext } from '@/stores/StoreProvider';
import { PropertyCard } from '@/components/PropertyCard';
import { database } from '@/utils/database';
import { observer } from 'mobx-react-lite';

interface InfinityScrollProps {
  containerClassName?: string;
}
const untilListing = 420;
export const InfinityScroll = observer((props: InfinityScrollProps) => {
  const { SearchPageStore } = useContext(StoreContext);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [endReached, setEnd] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const propertiesSectionHeight = `calc(100vh - ${untilListing}px)`;

  useEffect(() => {
    // Infinity scroll and data fetching
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = scrollContainer;
      const isEndOfPage = scrollTop + clientHeight >= scrollHeight - 500;
      if (isEndOfPage && !isLoading && !endReached) {
        setLoading(true);
        setEnd(true);
        const nextPage = SearchPageStore.currentPage + 1;
        database
          .fetchEntities(SearchPageStore.filters, false, 12, nextPage)
          .then((res) => {
            setLoading(false);
            if (!res?.data.length) return;
            SearchPageStore.addProperties(res?.data);
            SearchPageStore.setCurrentPage(nextPage);
            setEnd(false);
          });
      }
    };
    scrollContainer.addEventListener('scroll', handleScroll);
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading, endReached]);

  return (
    <div
      ref={scrollContainerRef}
      style={{ height: propertiesSectionHeight }}
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 gap-[24px] grow overflow-y-scroll',
        { 'lg:grid-cols-4': !SearchPageStore.isMapVisible },
        { 'lg:grid-cols-2 pr-[36px]': SearchPageStore.isMapVisible },
      )}
    >
      {SearchPageStore.properties?.map((property: any, index) => {
        // todo any
        return (
          <PropertyCard
            key={index}
            property={property}
            title={property.name}
            image={property.pictures[0]}
            price={property.price_dollar}
            address={`${property.city || ''}, ${property.country}`}
            features={`${property.type} • ${property.bedrooms} bds • ${property.bathrooms} ba • ${property.internal_area_ft} Sq Ft`}
          />
        );
      })}
      {isLoading && 'Loading...'}
    </div>
  );
});
