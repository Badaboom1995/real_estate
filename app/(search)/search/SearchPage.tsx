import React from 'react';
import { database } from '@/utils/database';
import { SearchPageContainer } from '@/app/(search)/search/SearchPageContainer';
import { Params } from '@/app/(search)/search/page';

export const SearchPage = async (props: Params) => {
  const filter = { ...props.searchParams };
  const { maxPrice, minPrice } = filter;
  delete filter.maxPrice;
  delete filter.minPrice;

  const fetchConfig: { range?: any; sort?: any; filter?: any } = {};
  if (maxPrice && minPrice) {
    fetchConfig.range = [
      { name: 'price_dollar', min: minPrice, max: maxPrice },
    ];
  }
  if (filter) {
    fetchConfig.filter = filter;
  }

  const { data: properties, count } = await database.fetchEntities({
    ...fetchConfig,
  });

  return <SearchPageContainer properties={properties} count={count} />;
};
