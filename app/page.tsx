import { Typography } from '@/components/Typography';
import Button from '@/components/Button';
import Link from 'next/link';
import { Filters } from '@/components/Filters';
import { Slider } from '@/components/Slider';
import { PropertyCard } from '@/components/PropertyCard';
import { database } from '@/utils/database';
import React from 'react';
import { CategoryCard } from '@/components/CategoryCard';

const Home = async () => {
  const latest = (await database.fetchEntities()) || {
    data: [],
    count: 0,
  };
  return (
    <main className="w-full">
      <section className="bg-indigo-500 p-[56px] pb-[173px] rounded">
        <div className="w-[660px] text-white">
          <Typography type="hero" className="mb-[24px]">
            Real estate in the Caribbean for living and investment
          </Typography>
          <Typography type="h2" className="font-normal mb-[77px]">
            Weave your way around the gated community to find secluded sandy
            coves for swimming and paddleboarding.
          </Typography>
          <div className="flex gap-[8px]">
            <Link href={'/search'}>
              <Button color="white">Search property</Button>
            </Link>
            <Button color="white" variant="transparent">
              Sell property
            </Button>
          </div>
        </div>
        <div className="controls"></div>
      </section>
      <section className="-translate-y-1/2 w-[1232px] m-auto">
        <Filters />
      </section>
      <section className="mb-[96px]">
        <Slider itemsPerSlide={4} title="Latest Caribbean Real Estate Listing">
          {latest.data.map((property: any, index: number) => (
            <PropertyCard
              key={index}
              property={property}
              title={property.name}
              image={property.pictures[0]}
              price={property.price_dollar}
              address={`${property.city || ''}, ${property.country}`}
              features={`${property.type} • ${property.bedrooms} bds • ${property.bathrooms} ba • ${property.internal_area_ft} Sq Ft`}
            />
          ))}
        </Slider>
      </section>
      <section className="mb-[96px]">
        <Slider itemsPerSlide={4} title="Caribbean Real Estate Complexes">
          {latest.data.map((property: any, index: number) => (
            <PropertyCard
              key={index}
              property={property}
              title={property.name}
              image={property.pictures[0]}
              price={property.price_dollar}
              address={`${property.city || ''}, ${property.country}`}
              features={`${property.type} • ${property.bedrooms} bds • ${property.bathrooms} ba • ${property.internal_area_ft} Sq Ft`}
            />
          ))}
        </Slider>
      </section>
      <section className="category">
        <div className="grid grid-cols-2 gap-[24px] mb-[24px]">
          <CategoryCard title="Beach Houses " />
          <CategoryCard title="Beach Houses " />
        </div>
        <div className="grid grid-cols-4 gap-[24px]">
          <CategoryCard title="Beach Houses " />
          <CategoryCard title="Beach Houses " />
          <CategoryCard title="Beach Houses " />
          <CategoryCard title="Beach Houses " />
        </div>
      </section>
      <section className="destinations">
        <div className="controls"></div>
        <div className="cards"></div>
      </section>
      <section className="filteredListing">
        <header className="top">
          <h2 className="title"></h2>
          <div className="controls"></div>
        </header>
        <div className="filters"></div>
        <div className="cards"></div>
      </section>
    </main>
  );
};

export default Home;
