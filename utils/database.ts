import supabase from '@/database/supabase';

interface Filter {
  [key: string]: string | number | any;
}
export interface Sort {
  column: string;
  ascending: boolean;
}

export const database = {
  fetchEntities,
  fetchEntity,
};
type RangeType = { name: string; min?: string; max?: string };
interface fetchParams {
  filter?: Filter;
  sort?: Sort | false;
  limit?: number;
  page?: number;
  range?: RangeType[];
}

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
    let query = supabase
      .from('NewProperties')
      .select('*', config)
      .not('price_dollar', 'is', null);

    if (page) {
      const range = [(page - 1) * limit, page * limit - 1];
      query.range(range[0], range[1]);
    } else {
      query.range(0, 11);
    }
    if (filter) {
      for (const key in filter) {
        if (!filter[key] || !filter[key].length) continue;
        if (Array.isArray(filter[key])) {
          query.in(key, filter[key]);
        } else {
          query.eq(key, filter[key]);
        }
      }
    }
    if (range?.length) {
      for (const { name, min, max } of range) {
        if (!min || !max) continue;
        query.gt(name, min).lt(name, max);
      }
    }
    if (sort) {
      query = query.order(sort.column, { ascending: sort.ascending });
    }
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
    return { data: [], count: 0, error };
  }

  return { data: normalizedData, count, error };
}

async function fetchEntity(id: string) {
  const { data, error } = await supabase
    .from('NewProperties')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}
