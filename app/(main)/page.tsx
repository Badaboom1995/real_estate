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
import heroBG from '@/public/assets/heroBG.jpg';
import { SliderControls } from '@/components/SliderControls';
import Image from 'next/image';

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
            <PropertyCard key={index} property={property} />
          ))}
        </Slider>
      </section>
      <section className="mb-[96px]">
        <Slider itemsPerSlide={4} title="Caribbean Real Estate Complexes">
          {latest.data.map((property: any, index: number) => (
            <PropertyCard key={index} property={property} />
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
          <div
            className="flex flex-col justify-end h-[520px] bg-blue-400 px-[32px] py-[28px] rounded"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aXNsYW5kJTIwdHJvcGljYWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60')",
              backgroundPosition: 'center',
            }}
          >
            <Typography type="text" className="text-white">
              Discover
            </Typography>
            <Typography type="h2" className="text-white">
              Place Name
            </Typography>
          </div>
          <div
            className="flex flex-col justify-end h-[520px] bg-blue-400 px-[32px] py-[28px] rounded"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aXNsYW5kJTIwdHJvcGljYWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60')",
              backgroundPosition: 'center',
            }}
          >
            <Typography type="text" className="text-white">
              Discover
            </Typography>
            <Typography type="h2" className="text-white">
              Place Name
            </Typography>
          </div>
          <div
            className="flex flex-col justify-end h-[520px] bg-blue-400 px-[32px] py-[28px] rounded"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aXNsYW5kJTIwdHJvcGljYWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60')",
              backgroundPosition: 'center',
            }}
          >
            <Typography type="text" className="text-white">
              Discover
            </Typography>
            <Typography type="h2" className="text-white">
              Place Name
            </Typography>
          </div>
          <div
            className="flex flex-col justify-end h-[520px] bg-blue-400 px-[32px] py-[28px] rounded"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aXNsYW5kJTIwdHJvcGljYWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60')",
              backgroundPosition: 'center',
            }}
          >
            <Typography type="text" className="text-white">
              Discover
            </Typography>
            <Typography type="h2" className="text-white">
              Place Name
            </Typography>
          </div>
        </div>
      </section>
      <div className="relative py-[72px] mb-[96px]">
        <div className="absolute left-1/2 top-0 -z-10 bottom-0 bg-primary w-[100vw] -translate-x-1/2"></div>
        <div className="flex items-center relative z-10 justify-between mb-[56px]">
          <Typography type="h1" className="text-white">
            Citizenship by Investment Programs
          </Typography>
          <div className="flex items-center gap-[24px]">
            <SliderControls prev={undefined} next={undefined} color="white" />
            <Button variant="transparent" color="white" size="md">
              Show all
            </Button>
          </div>
        </div>
        <div className="relative">
          <section className="relative grid grid-cols-2 gap-[56px] z-20 bg-white p-20  border rounded border-primary">
            <div className="">
              <Typography type="h2" className="mb-[16px]">
                Share property or Save it
              </Typography>
              <Typography type="paragraph" className="mb-[16px]">
                Feel like exploring the Dominican? Start the day with a hike on
                one of Playa Moron’s many trails. Weave your way around the
                gated community to find secluded sandy coves for swimming and
                paddleboarding.
              </Typography>
              <Typography type="paragraph" className="mb-[44px]">
                Feel like exploring the Dominican? Start the day with a hike on
                one of Playa Moron’s many trails. Weave your way around the
                gated community to find secluded sandy coves for swimming and
                paddleboarding.
              </Typography>
              <Link href={''}>
                <Button>Read more</Button>
              </Link>
            </div>
            <Image
              className="rounded-lg h-full"
              src="https://images.unsplash.com/photo-1689092598007-d1bd432e3c80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGNhcnJpYmVhbiUyMGlzbGFuZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
              alt="img"
              width={612}
              height={356}
            />
          </section>
          <div className="absolute p-20 left-1/2 -translate-x-1/2  z-10 -bottom-[24px] w-[95%] bg-[#528FE2] rounded"></div>
          <div className="absolute p-20 left-1/2 -translate-x-1/2 z-0 -bottom-[48px] w-[90%] bg-[#2975DB] rounded"></div>
        </div>
      </div>
      <section className="mb-[56px]">
        <Slider itemsPerSlide={4} title="Caribbean Real Estate By Price">
          {latest.data.map((property: any, index: number) => (
            <PropertyCard key={index} property={property} />
          ))}
        </Slider>
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
