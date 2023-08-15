'use client';
import cn from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { PropertyCard } from '@/components/PropertyCard';
import ReactPaginate from 'react-paginate';
import { propertyService } from '@/services/propertyService';
import { searchParamsType } from '@/types/SearchPropsTypes';
import { getUpdatedSearchState } from '@/utils/searchParams';
import { useRouter } from 'next/navigation';
import { propertiesAtom } from '@/stores/recoil/properties/propAtom';
import { useRecoilState } from 'recoil';

interface InfinityScrollProps {
  containerClassName?: string;
  mapRef?: any;
  searchParams: searchParamsType;
}
const untilListing = 350;

export const PropertiesList = (props: InfinityScrollProps) => {
  const { searchParams } = props;
  const [propState, setPropState] = useRecoilState(propertiesAtom);
  const { count, entities: properties } = propState;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const propertiesSectionHeight = `calc(100vh - ${untilListing}px)`;
  const pageCount = Math.floor(count / 12);
  const router = useRouter();

  const getCurrentPage = () => {
    if (!searchParams?.page) return 0;
    const currentPage = parseInt(searchParams?.page);
    if (currentPage > pageCount) return pageCount;
    return currentPage;
  };

  const handlePageClick = async (event: any) => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    const { count, data } = await propertyService.getProperties({
      ...searchParams,
      page: event.selected + 1,
    });
    getUpdatedSearchState(searchParams, { page: event.selected }, router);
    setPropState({ ...propState, count: count, entities: data });
  };

  return (
    <div>
      <div
        ref={scrollContainerRef}
        style={{ height: propertiesSectionHeight }}
        className={cn(
          'grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-[24px] grow overflow-y-scroll pr-[36px]',
        )}
      >
        {properties?.map((property: any, index) => {
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
};
