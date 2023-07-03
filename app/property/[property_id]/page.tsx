import { PropertyPageContainer } from './PropertyPageContainer';

const PropertyPageRoot = ({ params }: { params: { property_id: string } }) => (
  <PropertyPageContainer id={params.property_id} />
);

export default PropertyPageRoot;
