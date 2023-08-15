import React from 'react';
import Button from '@/components/Button';
import { Typography } from '@/components/Typography';
import { strings } from '@/utils/strings';
import favoritePrimary from '@/public/assets/favorite-primary.svg';
import shareWhite from '@/public/assets/share-white.svg';
import { ToastContainer } from 'react-toastify';
import { TabText } from '@/components/TabText';
import { database } from '@/utils/database';
import { Slider } from '@/components/Slider';
import { PropertyCard } from '@/components/PropertyCard';
import BackButton from '@/components/BackButton/BackButton';
import { locationsService } from '@/services/locationsService';
import Image from 'next/image';
import arrow from '@/public/assets/arrow-down.svg';
import Link from 'next/link';
import { Map } from '@/components/Map';

export type Params = {
  params: { location_id: string };
  searchParams?: Record<string, any>;
};

const LocationParent = async ({ params }: Params) => {
  const latest = (await database.fetchEntities({})) || {
    data: [],
    count: 0,
  };
  const { data } =
    (await locationsService.getLocationByName(params.location_id)) || {};

  const location = data?.[0];

  const { data: children } = await locationsService.getChildrenLocations(
    location.name,
  );

  return (
    <div>
      <ToastContainer />
      <div className="flex justify-between items-center mb-[24px]">
        <div>
          <BackButton />
        </div>
      </div>
      <section className="mb-[56px]">
        <Image
          className={'w-full max-h-[500px] object-cover rounded'}
          src={location?.pictures[0]}
          width={670}
          height={500}
          alt="hero-picture"
        />
      </section>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8 p-4">
          <Typography type="h1" className="w-5/6 mb-[24px]">
            {strings.removeDuplicateSubstring(
              location?.description || 'Country Name',
            )}
          </Typography>
          <section className="mb-[56px]">
            <TabText>{location?.description}</TabText>
          </section>
          <section className="mb-[56px]">
            <Typography type="h2" className="mb-[16px]">
              Neighborhoods
            </Typography>
            <div className="grid grid-cols-2 gap-x-[24px] gap-y-[8px]">
              {children.map((item: any) => (
                <div key={item.id} className="p-[12px] bg-[#F7F7FC] rounded">
                  <Link href={`locations/${location.name}/${item.name}`}>
                    <p className="text-[16px] font-[500] flex justify-between">
                      {item.name}{' '}
                      <Image src={arrow} alt="arrow" className="-rotate-90" />
                    </p>
                    <span className="text-[12px] text-[#4E4B66]">
                      {12} properties
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </section>
          <section className="mb-[56px]">
            <Typography type="h2" className="mb-[16px]">
              Location
            </Typography>
            <div className="w-[862px] h-[420px] bg-slate-200 overflow-hidden"></div>
          </section>
          <section className="border border-[#F7F7FC] rounded bg-white p-[24px] mb-[56px]">
            <Typography className="mb-[16px]" type="h2">
              Share with Friend or Save it
            </Typography>
            <Typography className="mb-[32px]" type="paragraph">
              Feel like exploring the Dominican? Start the day with a hike on
              one of Playa Moron’s many trails. Weave your way around the gated
              community to find secluded sandy coves for swimming and
              paddleboarding.
            </Typography>
            <div className="flex gap-[8px]">
              <Button iconLeft={favoritePrimary} variant="transparent">
                Save
              </Button>
              <Button iconLeft={shareWhite}>Share</Button>
            </div>
          </section>
        </div>
        <div className="col-span-4 p-4">
          <section className="bg-white border border-[#F7F7FC] p-[24px] mb-[8px]">
            <Typography type="info" className="mb-[8px]">
              Price from
            </Typography>
            <Typography type="h1" className="mb-[32px]">
              $
              {location?.price_from_dollar
                ? strings.addCommas(location?.price_from_dollar.toString())
                : strings.addCommas('780000')}
            </Typography>
            <Button className={'w-full flex justify-center'}>
              Send enquiry
            </Button>
          </section>
        </div>
      </div>
      <section className="mb-[56px]">
        <Slider itemsPerSlide={4} title="Latest Caribbean Real Estate Listings">
          {latest.data.map((property: any, index: number) => (
            <PropertyCard key={index} property={property} />
          ))}
        </Slider>
      </section>
    </div>
  );
};

export default LocationParent;
