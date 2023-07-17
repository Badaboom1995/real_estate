import React from 'react';
import { database } from '@/utils/database';
import { SearchPageContainer } from '@/app/search/SearchPageContainer';

export const SearchPage: React.FC = async () => {
  const { data: properties, count } = (await database.fetchEntities()) || {
    data: [],
    count: 0,
  };
  console.log('load');
  return <SearchPageContainer properties={properties} count={count} />;
};
