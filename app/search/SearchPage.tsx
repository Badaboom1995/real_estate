import React from 'react';
import { SearchPageContainer } from '@/app/search/SearchPageContainer';
import { Params } from '@/app/search/page';
import { propertyService } from '@/services/propertyService';

export const SearchPage = async (props: Params) => {
  const params = { ...props.searchParams };
  const { data: properties } = await propertyService.getProperties(params);
  const { count: pointsCount, data: points } = await propertyService.getPoints(
    params,
  );

  return (
    <SearchPageContainer
      properties={properties}
      count={pointsCount}
      points={points}
    />
  );
};
