export enum SortEnum {
  PRICE_ASC = 'PRICE_ASC',
  PRICE_DESC = 'PRICE_DESC',
  DATE_ASC = 'DATE_ASC',
  DATE_DESC = 'DATE_DESC',
}
export type FiltersType = {
  city?: string[];
  type?: string[];
  bedrooms?: string[];
  bathrooms?: string[];
  features?: string[];
  minPrice?: string;
  maxPrice?: string;
  is_construction?: boolean;
  // is_constitution?: boolean;
};

export type searchParamsType = FiltersType & { page?: string } & {
  sort?: SortEnum;
};
