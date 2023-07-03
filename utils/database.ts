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

async function fetchEntities(
  filter?: Filter,
  sort?: Sort | false,
  limit: number = 12,
  page?: number,
) {
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
    // if (sort) {
    //   query = query.order(sort.column, { ascending: sort.ascending });
    // }
    return query;
  };

  const { data, error } = await makeRequest();
  const { count } = await makeRequest(true);

  if (error) {
    console.error('error', error);
    return null;
  }

  return { data, count };
}
