import React from 'react';
import { SearchPageContainer } from '@/app/(search)/search/SearchPageContainer';
import { Params } from '@/app/(search)/search/page';
import { propertyService } from '@/services/propertyService';

export const SearchPage = async (props: Params) => {
  const params = { ...props.searchParams };
  const { count, data: properties } = await propertyService.getProperties(
    params,
  );

  return <SearchPageContainer properties={properties} count={count} />;
};
