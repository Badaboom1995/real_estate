import { Filters } from '@/components/Filters';
import { PropertyCard } from '@/components/PropertyCard';
import { FormProvider, useForm } from 'react-hook-form';
import { PropertySorting } from '@/components/PropertySorting';
import supabase from '@/database/supabase';
import { PropertyType } from '@/types/Property';
import { database } from '@/utils/database';

interface FormData {
  name: string;
  email: string;
  password: string;
  role: string;
}
const headerHeight = 118;
const untilListing = 420;

const Form: React.FC = async () => {
  const properties = await database.fetchEntities({ type: 'House' });

  const searchPageHeight = `calc(100vh - ${headerHeight}px)`;
  const propertiesSectionHeight = `calc(100vh - ${untilListing}px)`;
  return (
    <div style={{ height: searchPageHeight }} className={'overflow-hidden'}>
      <section>
        <Filters />
      </section>
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[24px]">Property title (312)</h2>
          <PropertySorting />
        </div>
        <div className="flex justify-between w-full">
          <div
            style={{ height: propertiesSectionHeight }}
            className="flex flex-wrap justify-between gap-y-[24px] pr-[36px] w-1/2 overflow-y-scroll"
          >
            {properties?.map((property: PropertyType) => {
              return (
                <PropertyCard
                  key={property.id}
                  title={property.name}
                  image={property.pictures[0]}
                  price={property.price_dollar}
                  address={`${property.city}, ${property.country}`}
                  features={`${property.type} • ${property.bedrooms} bds • ${property.bathrooms} ba • ${property.internal_area_ft} Sq Ft`}
                />
              );
            })}
          </div>
          <div className={'w-1/2'}>
            <div className="border grow h-[768px] justify-center items-center bg-indigo-50 text-center">
              map
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Form;
