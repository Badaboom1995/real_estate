import { types } from 'mobx-state-tree';

const PropertyType = types.model('PropertyType', {
  id: types.maybeNull(types.number),
  created_at: types.maybeNull(types.string),
  link: types.maybeNull(types.string),
  name: types.maybeNull(types.string),
  type: types.maybeNull(types.string),
  description: types.maybeNull(types.string),
  price_dollar: types.maybeNull(types.string),
  pictures: types.maybeNull(types.array(types.string)),
  bedrooms: types.maybeNull(types.number),
  bathrooms: types.maybeNull(types.number),
  country: types.maybeNull(types.string),
  city: types.maybeNull(types.string),
  point: types.maybeNull(types.string),
  internal_area_ft: types.maybeNull(types.number),
  external_area_ft: types.optional(types.maybeNull(types.number), null),
  features: types.maybeNull(types.array(types.string)),
  is_commercial: types.maybeNull(types.boolean),
  is_construction: types.maybeNull(types.boolean),
  is_available: types.boolean,
  seller_id: types.maybeNull(types.number),
  project_id: types.maybeNull(types.number),
  developer_id: types.maybeNull(types.number),
  property_id: types.maybeNull(types.string),
});

const LocationType = types.model('LocationType', {
  parent: types.string,
  children: types.array(types.string),
});

export const SearchPageModel = types
  .model({
    isMapVisible: types.boolean,
    dicts: types.model({
      locations: types.array(LocationType),
      types: types.array(types.string),
    }),
    filters: types.model('filtersType', {
      city: types.array(types.string),
      type: types.array(types.string),
    }),
    properties: types.optional(types.array(PropertyType), []),
    propertiesCount: types.optional(types.number, 0),
    currentPage: types.optional(types.number, 1),
  })
  .actions((self) => ({
    toggleMap() {
      self.isMapVisible = !self.isMapVisible;
    },
    setCount(count: number) {
      self.propertiesCount = count;
    },
    //todo fix type
    setFilters(filters: any) {
      self.filters = filters;
    },
    //todo fix type
    setProperties(properties: any) {
      self.properties.replace(properties);
    },
    addProperties(properties: any) {
      console.log('addprops');
      self.properties.push(...properties);
    },
    setDict(name: 'locations' | 'types', dict: any) {
      self.dicts[name] = dict;
    },
    setCurrentPage(page: number) {
      self.currentPage = page;
    },
    getPropertyById(id: string) {
      return self.properties.find((property) => property.id === parseInt(id));
    },
  }));

export const searchPageDefault = {
  isMapVisible: true,
  dicts: {
    locations: [],
    types: [],
  },
  filters: {
    city: [],
  },
  properties: [],
  page: 1,
};
