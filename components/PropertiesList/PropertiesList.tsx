import cn from 'classnames';
import React, { useContext, useRef, useState } from 'react';
import { StoreContext } from '@/stores/StoreProvider';
import { PropertyCard } from '@/components/PropertyCard';
import { observer } from 'mobx-react-lite';
import ReactPaginate from 'react-paginate';
import { propertyService } from '@/services/propertyService';
import { searchParamsType } from '@/types/SearchPropsTypes';
import { getUpdatedSearchState } from '@/utils/searchParams';
import { useRouter } from 'next/navigation';

interface InfinityScrollProps {
  containerClassName?: string;
  mapRef?: any;
  searchParams: searchParamsType;
}
const untilListing = 400;

export const PropertiesList = observer((props: InfinityScrollProps) => {
  const { searchParams } = props;
  const { SearchPageStore } = useContext(StoreContext);
  const [isLoading, setLoading] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const propertiesSectionHeight = `calc(100vh - ${untilListing}px)`;
  const pageCount = Math.floor(SearchPageStore.propertiesCount / 12);
  const router = useRouter();
  const getCurrentPage = () => {
    if (!searchParams?.page) return 0;
    const currentPage = parseInt(searchParams?.page);
    if (currentPage > pageCount) return pageCount;
    return currentPage;
  };

  const handlePageClick = async (event: any) => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    setLoading(true);
    const { count, data } = await propertyService.getProperties({
      ...searchParams,
      page: event.selected + 1,
    });
    getUpdatedSearchState(searchParams, { page: event.selected }, router);
    SearchPageStore.setCount(count);
    SearchPageStore.setProperties(data);
    setLoading(false);
  };

  return (
    <div>
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
              mapRef={props.mapRef}
              property={property}
            />
          );
        })}
        <div className="col-span-2 mt-[32px] mb-[32px]">
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            nextLinkClassName="pl-2"
            previousLinkClassName="pr-2"
            onPageChange={handlePageClick}
            forcePage={getCurrentPage()}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            pageCount={pageCount}
            containerClassName={'flex justify-center gap-2 items-center w-full'}
            pageClassName={'p-2 px-4 border rounded-[8px]'}
            activeClassName="bg-primary text-white"
            renderOnZeroPageCount={null}
          />
        </div>
      </div>
    </div>
  );
});
