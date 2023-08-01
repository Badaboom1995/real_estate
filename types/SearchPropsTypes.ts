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
  minPrice?: string;
  maxPrice?: string;
};

export type searchParamsType = FiltersType & { page?: string } & {
  sort?: SortEnum;
};
