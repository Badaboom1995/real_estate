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
  getProperty: async (id: string) => {
    const property = await database.fetchEntity(id);
    return property;
  },
  getProperties: async (params: searchParamsType) => {
    const {
      city,
      type,
      bedrooms,
      bathrooms,
      minPrice,
      maxPrice,
      is_construction = false,
      features,
      page = '0',
      sort = false,
    } = params;

    const filter = {
      city,
      type,
      bedrooms,
      bathrooms,
    };

    if (is_construction) {
      //@ts-ignore
      filter.is_construction = 'true';
    }

    const { data, error, count } = await database.fetchEntities({
      filter,
      features,
      sort: getSortObject(sort),
      range: [{ name: 'price_dollar', min: minPrice, max: maxPrice }],
      page: parseInt(page),
    });
    if (error) {
      throw new Error(error.message);
    }

    return { count, data };
  },
  getPoints: async (params: searchParamsType) => {
    const {
      city,
      type,
      bedrooms,
      bathrooms,
      minPrice,
      maxPrice,
      is_construction = false,
      features,
    } = params;

    const filter = {
      city,
      type,
      bedrooms,
      bathrooms,
    };

    if (is_construction) {
      //@ts-ignore
      filter.is_construction = 'true';
    }
    const { data, error, count } = await database.fetchEntities({
      limit: false,
      select: 'id,lat,lon',
      filter,
      features,
      range: [{ name: 'price_dollar', min: minPrice, max: maxPrice }],
    });
    return { data, count: count | 0, error };
  },
};
