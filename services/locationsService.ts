import supabase from '@/database/supabase';

export const locationsService = {
  getLocations: async () => {
    const { data, error } = await supabase
      .from('Locations')
      .select('*')
      .is('parent_id', null);
    return { data, error };
  },
  getCategories: async () => {
    const { data, error } = await supabase.from('Categories').select('*');
    return { data, error };
  },
  getLocationByName: async (name: string) => {
    const { data, error } = await supabase
      .from('Locations')
      .select('*')
      .eq('name', name)
      .single();

    console.log(data, error);
    return { data, error };
  },
  getChildrenLocations: async (parentId: string) => {
    const { data, error } = await supabase
      .from('Locations')
      .select('*')
      .eq('parent_id', parentId);

    return { data, error };
  },
};
