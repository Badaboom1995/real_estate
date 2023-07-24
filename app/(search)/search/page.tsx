import { SearchPage } from './SearchPage';
export type Params = {
  params: { slug: string };
  searchParams?: Record<string, any>;
};
const page = ({ params, searchParams }: Params) => (
  <SearchPage params={params} searchParams={searchParams} />
);

export default page;
