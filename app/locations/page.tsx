import React from 'react';
import { Typography } from '@/components/Typography';
import { LocationCard } from '@/components/LocationCard';
import { CTABlock } from '@/components/CTABlock';
import { Slider } from '@/components/Slider';
import { PropertyCard } from '@/components/PropertyCard';
import { database } from '@/utils/database';
import BackButton from '@/components/BackButton/BackButton';
import { locationsService } from '@/services/locationsService';

type locationType = {
  id: string;
  name: string;
  description: string;
  pictures: string[];
  // TODO: parent_id should be a camel case
  parent_id: string;
};

const Locations = async () => {
  const latest = (await database.fetchEntities({})) || {
    data: [],
    count: 0,
  };
  const { data: locations, error } = await locationsService.getLocations();

  return (
    <div>
      <div className="mt-[24px] mb-[64px]">
        <BackButton />
      </div>
      <Typography type="h1" className="mb-[16px]">
        Top Destinations
      </Typography>
      <Typography type="paragraph" className="max-w-[900px] mb-[64px] ">
        Feel like exploring the Dominican? Start the day with a hike on one of
        Playa Moron’s many trails. Weave your way around the gated community to
        find secluded sandy coves for swimming and paddleboarding. When you’re
        ready to chill with friends, the beach house pool awaits.
      </Typography>
      <div className="grid grid-cols-4 gap-x-[24px] gap-y-[32px]">
        {locations?.map((location: locationType) => (
          <LocationCard
            key={location.id}
            placeName={location.name}
            url={location.pictures ? location.pictures[0] : ''}
            link={`/locations/${location.name}`}
          />
        ))}
      </div>
      <CTABlock />
      <section className="mb-[56px]">
        <Slider itemsPerSlide={4} title="Caribbean Real Estate By Price">
          {latest.data.map((property: any, index: number) => (
            <PropertyCard key={index} property={property} />
          ))}
        </Slider>
      </section>
    </div>
  );
};

export default Locations;
