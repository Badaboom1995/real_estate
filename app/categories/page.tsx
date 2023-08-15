import React from 'react';
import { Typography } from '@/components/Typography';
import { LocationCard } from '@/components/LocationCard';
import { CTABlock } from '@/components/CTABlock';
import { Slider } from '@/components/Slider';
import { PropertyCard } from '@/components/PropertyCard';
import { database } from '@/utils/database';
import BackButton from '@/components/BackButton/BackButton';
import { locationsService } from '@/services/locationsService';
import { CategoryCard } from '@/components/CategoryCard';

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
  const { data: categories, error } = await locationsService.getCategories();

  return (
    <div>
      <div className="mt-[24px] mb-[64px]">
        <BackButton />
      </div>
      <Typography type="h1" className="mb-[16px]">
        Caribbean Real Estate by Category
      </Typography>
      <Typography type="paragraph" className="max-w-[900px] mb-[64px] ">
        Feel like exploring the Dominican? Start the day with a hike on one of
        Playa Moron’s many trails. Weave your way around the gated community to
        find secluded sandy coves for swimming and paddleboarding. When you’re
        ready to chill with friends, the beach house pool awaits.
      </Typography>
      <div className="grid grid-cols-4 gap-x-[24px] gap-y-[32px]">
        {categories?.map((category: any) => (
          <CategoryCard
            key={category.id}
            title={category.name}
            link={category.link}
            bg="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2373&q=80"
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
