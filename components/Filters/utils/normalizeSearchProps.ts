export const normalizeSearchProps = (filters: Record<string, any>) => {
  for (let key in filters) {
    if (
      key === 'city' ||
      key === 'type' ||
      key === 'bedrooms' ||
      key === 'bathrooms'
    ) {
      if (typeof filters[key] === 'string') {
        filters[key] = [filters[key]];
      }
    }
  }
  return filters;
};
