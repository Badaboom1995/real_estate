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
import { locationsService } from '@/services/locationsService';
import arrow from '@/public/assets/arrow-blue.svg';
import supabase from '@/database/supabase';

const getLink = (name: string) => {
  if (name === 'Bahamas') {
    return 'https://real-estate-alpha-kohl.vercel.app/search?minPrice=0&maxPrice=60000000&city=%20Bahamas&city=Abaco%20Islands&city=Albany&city=Andros&city=Berry%20Islands&city=Bimini&city=Cat%20Island&city=Elbow%20Cay&city=Eleuthera%20%26%20Harbour%20Island&city=Exumas&city=Grand%20Bahama&city=Kamalame%20Cay&city=Long%20Island&city=Lubbers%20Quarters&city=Lyford%20Cay&city=Nassau%20%26%20New%20Providence&city=Old%20Fort%20Bay&city=Palm%20Cay&city=Paradise%20Island&city=Rose%20Island&city=Rum%20Cay&city=San%20Salvador&city=Sandyport&city=Spanish%20Wells&city=Treasure%20Cay&city=Windermere%20Island';
  }
  if (name === 'Costa Rica') {
    return 'https://real-estate-alpha-kohl.vercel.app/search?minPrice=0&maxPrice=60000000&city=%20Costa%20Rica&city=Alajuela&city=Escazu&city=Guanacaste&city=Hacienda%20Pinilla&city=Heredia&city=Jaco&city=Las%20Catalinas&city=Osa%20Peninsula&city=Papagayo&city=Playa%20Flamingo&city=Puntarenas&city=San%20Jose&city=Santa%20Ana&city=Santa%20Teresa&city=Tamarindo&city=Uvita&city=Puntarenas&city=Puntarenas';
  }
  return `/locations/${name}`;
};

const Home = async () => {
  const latest = (await database.fetchEntities({})) || {
    data: [],
    count: 0,
  };
  const { data: locations } = await locationsService.getLocations();
  const { data: categories, error: err } = await supabase
    .from('Categories')
    .select('*');
  console.log(categories);
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
        <Filters panelView />
      </section>
      <section className="mb-[96px]">
        <Slider
          itemsPerSlide={4}
          title="Latest Caribbean Real Estate Listing"
          link="/search"
        >
          {latest.data.map((property: any, index: number) => (
            <PropertyCard key={index} property={property} />
          ))}
        </Slider>
      </section>
      <section className="mb-[96px]">
        <Slider
          itemsPerSlide={4}
          title="Caribbean Real Estate Complexes"
          link="/search"
        >
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
            title={categories[0].name}
            bg="https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aXNsYW5kJTIwdHJvcGljYWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
            link={
              categories[0].link ||
              'https://real-estate-alpha-kohl.vercel.app/search?minPrice=1000000&maxPrice=60000000&type=House&type=Villa'
            }
          />
          <CategoryCard
            title={categories[1].name}
            bg="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2373&q=80"
            link={
              categories[1].link ||
              'https://real-estate-alpha-kohl.vercel.app/search?minPrice=0&maxPrice=60000000&is_construction=true'
            }
          />
        </div>
        <div className="grid grid-cols-3 gap-[24px]">
          <CategoryCard
            title={categories[2].name}
            bg="https://images.unsplash.com/photo-1689092598007-d1bd432e3c80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGNhcnJpYmVhbiUyMGlzbGFuZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
            link={
              categories[2].link ||
              'https://real-estate-alpha-kohl.vercel.app/search?minPrice=0&maxPrice=60000000&city=%20Bahamas&city=Abaco%20Islands&city=Albany&city=Andros&city=Berry%20Islands&city=Bimini&city=Cat%20Island&city=Elbow%20Cay&city=Eleuthera%20%26%20Harbour%20Island&city=Exumas&city=Grand%20Bahama&city=Kamalame%20Cay&city=Long%20Island&city=Lubbers%20Quarters&city=Lyford%20Cay&city=Nassau%20%26%20New%20Providence&city=Old%20Fort%20Bay&city=Palm%20Cay&city=Paradise%20Island&city=Rose%20Island&city=Rum%20Cay&city=San%20Salvador&city=Sandyport&city=Spanish%20Wells&city=Treasure%20Cay&city=Windermere%20Island&type=Land'
            }
          />
          <CategoryCard
            title={categories[3].name}
            bg="https://images.unsplash.com/photo-1627512729059-fb322f8436f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2204&q=80"
            link={
              categories[3].link ||
              'https://real-estate-alpha-kohl.vercel.app/search?city=Jalisco&city=Los%20Cabos&city=Manzanillo&city=Nayarit&city=Playa%20del%20Carmen&city=Puerto%20Vallarta&city=Riviera%20Maya&city=Tulum&city=Yucatan&minPrice=1000000&maxPrice=60000000&type=Villa'
            }
          />
          <CategoryCard
            title={categories[4].name}
            bg="https://images.unsplash.com/photo-1568548634530-38ee433dcc1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fGNhcnJpYmVhbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
            link={
              categories[4].link ||
              'https://real-estate-alpha-kohl.vercel.app/search?minPrice=0&maxPrice=60000000&city=%20Roatan&city=Bay%20Islands&city=Col%C3%B3n&city=Guanaja&city=Palmetto%20Bay&city=Parrot%20Tree%20Plantation&city=Pristine%20Bay&city=Sandy%20Bay&city=West%20Bay&city=West%20End'
            }
          />
        </div>
      </section>
      <section className="mb-[56px]">
        <div className="flex justify-between w-full items-center mb-[56px]">
          <Typography type="h1">Top Destinations</Typography>
          <Link href="/locations">
            <Button variant="transparent">Show all destinations</Button>
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-[24px]">
          {locations?.map((place: any) => (
            <div
              key={place.id}
              className="flex flex-col justify-end h-[520px] bg-blue-400 px-[32px] py-[28px] rounded"
              style={{
                backgroundImage: `url('${
                  place?.pictures ? place?.pictures[0] : heroBG
                }')`,
                backgroundPosition: 'center',
              }}
            >
              <Link href={place.link}>
                <Typography type="text" className="text-white">
                  Discover
                </Typography>
                <Typography
                  type="h2"
                  className="text-white w-full flex justify-between"
                >
                  <span>{place.name}</span>
                  <span className="bg-white py-2 px-3 -rotate-90 rounded-full flex items-center justify-center">
                    <Image src={arrow} alt={'arrow'} className={''} />
                  </span>
                </Typography>
              </Link>
            </div>
          ))}
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
