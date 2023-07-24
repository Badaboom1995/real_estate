// 'use client';
import React from 'react';
import { Typography } from '@/components/Typography';
import Button from '@/components/Button';
import Link from 'next/link';
import { Filters } from '@/components/Filters';
import { Slider } from '@/components/Slider';
import { PropertyCard } from '@/components/PropertyCard';
import { database } from '@/utils/database';
import { CategoryCard } from '@/components/CategoryCard';
import heroBG from '@/app/(main)/assets/heroBG.jpg';

const Home = async () => {
  const latest = (await database.fetchEntities({})) || {
    data: [],
    count: 0,
  };
  return (
    <main className="w-full">
      <section
        className="relative p-[56px] pb-[173px] rounded"
        style={{
          backgroundImage: `url(${heroBG.src})`,
          backgroundPosition: 'center',
        }}
      >
        <div className="relative w-[660px] text-white z-10">
          <Typography type="hero" className="mb-[24px]">
            Real estate in the Caribbean for living and investment
          </Typography>
          <Typography type="h2" className="font-normal mb-[77px]">
            Weave your way around the gated community to find secluded sandy
            coves for swimming and paddleboarding.
          </Typography>
          <div className="flex gap-[8px]">
            <Link href="/search">
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
      <section className="mb-[96px]">
        <div className="flex justify-between w-full items-center mb-[56px]">
          <Typography type="h1">
            Browse Caribbean Real Estate by Category
          </Typography>
          <Button variant="transparent">Show all</Button>
        </div>
        <div className="grid grid-cols-2 gap-[24px] mb-[24px]">
          <CategoryCard
            title="Beach Houses "
            bg="https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aXNsYW5kJTIwdHJvcGljYWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
          />
          <CategoryCard
            title="Beach Houses "
            bg="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2373&q=80"
          />
        </div>
        <div className="grid grid-cols-3 gap-[24px]">
          <CategoryCard
            title="Beach Houses "
            bg="https://images.unsplash.com/photo-1689092598007-d1bd432e3c80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGNhcnJpYmVhbiUyMGlzbGFuZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
          />
          <CategoryCard
            title="Beach Houses "
            bg="https://images.unsplash.com/photo-1627512729059-fb322f8436f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2204&q=80"
          />
          <CategoryCard
            title="Beach Houses "
            bg="https://images.unsplash.com/photo-1568548634530-38ee433dcc1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fGNhcnJpYmVhbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
          />
        </div>
      </section>
      <section className="mb-[56px]">
        <div className="flex justify-between w-full items-center mb-[56px]">
          <Typography type="h1">Top Destinations</Typography>
          <Button variant="transparent">Show all destinations</Button>
        </div>
        <div className="grid grid-cols-4 gap-[24px]">
          <div className="flex flex-col justify-end h-[520px] bg-blue-400 px-[32px] py-[28px] rounded">
            <Typography type="text" className="text-white">
              Discover
            </Typography>
            <Typography type="h2" className="text-white">
              Place Name
            </Typography>
          </div>
          <div className="flex flex-col justify-end h-[520px] bg-blue-400 px-[32px] py-[28px] rounded">
            <Typography type="text" className="text-white">
              Discover
            </Typography>
            <Typography type="h2" className="text-white">
              Place Name
            </Typography>
          </div>
          <div className="flex flex-col justify-end h-[520px] bg-blue-400 px-[32px] py-[28px] rounded">
            <Typography type="text" className="text-white">
              Discover
            </Typography>
            <Typography type="h2" className="text-white">
              Place Name
            </Typography>
          </div>
          <div className="flex flex-col justify-end h-[520px] bg-blue-400 px-[32px] py-[28px] rounded">
            <Typography type="text" className="text-white">
              Discover
            </Typography>
            <Typography type="h2" className="text-white">
              Place Name
            </Typography>
          </div>
        </div>
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
