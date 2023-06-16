export type PropertyType = {
  id: number;
  created_at: string;
  link: string;
  name: string;
  type: string;
  description: string;
  price_dollar: string;
  pictures: string[]; // or any[] if the array can contain different types
  bedrooms: number;
  bathrooms: number;
  country: string;
  city: string;
  point: string;
  internal_area_ft: number;
  external_area_ft: number;
  features: null | string; // or whatever type features should be
  is_commercial: null | boolean; // or whatever type is_commercial should be
  is_construction: null | boolean; // or whatever type is_construction should be
  is_available: boolean;
  seller_id: null | number; // or whatever type seller_id should be
  project_id: null | number; // or whatever type project_id should be
  developer_id: null | number; // or whatever type developer_id should be
  property_id: string;
};
