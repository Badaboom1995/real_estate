import supabase from '@/database/supabase';

interface Filter {
  [key: string]: string | number;
}
interface Sort {
  column: string;
  ascending: boolean;
}

export const database = {
  fetchEntities,
};

async function fetchEntities(filter?: Filter, sort?: Sort, limit?: number) {
  let query = supabase
    .from('NewProperties')
    .select('*')
    .limit(limit || 10);

  if (filter) {
    for (const key in filter) {
      if (filter.hasOwnProperty(key)) {
        query = query.eq(key, filter[key]);
      }
    }
  }

  if (sort) {
    query = query.order(sort.column, { ascending: sort.ascending });
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}
