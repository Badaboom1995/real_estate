import supabase from '@/database/supabase';

interface Filter {
  [key: string]: string | number | any;
}
interface Sort {
  column: string;
  ascending: boolean;
}

export const database = {
  fetchEntities,
};
interface fetchParams {
  filter?: Filter;
  sort?: Sort | false;
  limit?: number;
  page?: number;
  range?: RangeType[];
}
type RangeType = { name: string; min: string; max: string };
async function fetchEntities(props?: fetchParams) {
  const defaults: fetchParams = {
    filter: {},
    sort: false,
    limit: 12,
    page: 1,
    range: [],
  };
  const { filter, sort, limit = 12, page, range } = props || defaults;

  const makeRequest = (isCount?: boolean) => {
    const config = isCount ? { count: 'estimated', head: true } : {};
    let query = supabase.from('NewProperties').select('*', config);

    if (page) {
      const range = [(page - 1) * limit, page * limit - 1];
      query.range(range[0], range[1]);
    } else {
      query.range(0, 11);
    }
    if (filter) {
      for (const key in filter) {
        if (!filter[key] || !filter[key].length) continue;
        console.log('key', key, JSON.parse(JSON.stringify(filter[key])));
        if (Array.isArray(filter[key])) {
          query.in(key, filter[key]);
        } else {
          query.eq(key, filter[key]);
        }
      }
    }
    if (range?.length) {
      for (const { name, min, max } of range) {
        query.gt(name, min).lt(name, max);
      }
    }
    // if (sort) {
    //   query = query.order(sort.column, { ascending: sort.ascending });
    // }
    return query;
  };
  const { data, error } = await makeRequest();
  const normalizedData = data?.map((item: any) => ({
    ...item,
    price_dollar: parseInt(item.price_dollar),
  }));
  const { count } = await makeRequest(true);

  if (error) {
    console.error('error', error);
    return null;
  }

  return { data: normalizedData, count };
}
