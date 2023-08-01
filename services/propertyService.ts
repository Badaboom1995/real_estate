import { database, Sort } from '@/utils/database';
import { searchParamsType, SortEnum } from '@/types/SearchPropsTypes';

const getSortObject = (sortType: SortEnum | false): Sort | false => {
  switch (sortType) {
    case SortEnum.PRICE_ASC:
      return { column: 'price_dollar', ascending: true };
    case SortEnum.PRICE_DESC:
      return { column: 'price_dollar', ascending: false };
    default:
      return false;
  }
};

export const propertyService = {
  getProperties: async (params: searchParamsType) => {
    const {
      city,
      type,
      bedrooms,
      bathrooms,
      minPrice,
      maxPrice,
      page = '0',
      sort = false,
    } = params;

    const filter = {
      city,
      type,
      bedrooms,
      bathrooms,
    };

    const { data, error, count } = await database.fetchEntities({
      filter,
      sort: getSortObject(sort),
      range: [{ name: 'price_dollar', min: minPrice, max: maxPrice }],
      page: parseInt(page),
    });
    if (error) {
      throw new Error(error.message);
    }

    // store.SearchPageStore.setCount(count);
    // store.SearchPageStore.setProperties(data);

    return { count, data };
  },
};
