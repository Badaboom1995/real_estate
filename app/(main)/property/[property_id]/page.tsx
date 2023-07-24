import { PropertyPageContainer } from './PropertyPageContainer';
import { database } from '@/utils/database';

const PropertyPageRoot = async ({
  params,
}: {
  params: { property_id: string };
}) => {
  const data = await database.fetchEntity(params.property_id);
  const result = Array.isArray(data) ? data[0] : data;
  return <PropertyPageContainer data={result} />;
};

export default PropertyPageRoot;
