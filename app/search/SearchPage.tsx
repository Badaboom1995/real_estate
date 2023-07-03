import React from 'react';
import { database } from '@/utils/database';
import { SearchPageContainer } from '@/app/search/SearchPageContainer';
import { getCountryArray } from '@/utils/getCountriesArray';

export const SearchPage: React.FC = async () => {
  const { data: properties, count } = (await database.fetchEntities()) || {
    data: [],
    count: 0,
  };
  // const { data } = await getCountryArray();
  // const locations = data?.map((entity) => {
  //   return {
  //     parent: entity.country,
  //     children: entity.cities,
  //   };
  // });
  return (
    <SearchPageContainer
      properties={properties}
      count={count}
      // locations={locations}
    />
  );
};
