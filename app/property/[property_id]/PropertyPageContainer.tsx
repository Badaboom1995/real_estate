'use client';
import React, { useContext, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { StoreProvider, StoreContext } from '@/stores/StoreProvider';
import Button from '@/components/Button';
import { Typography } from '@/components/Typography';
import Tabs from '@/components/Tabs';
import { TextContainer } from '@/components/TextContainer';
import { GalleryGrid } from '@/components/GalleryGrid';
import { useRouter } from 'next/navigation';
import { strings } from '@/utils/strings';
import backArrow from '@/assets/backArrow.svg';
import share from '@/assets/share.svg';
import favorite from '@/assets/favorite.svg';
import favoritePrimary from '@/assets/favorite-primary.svg';
import shareWhite from '@/assets/share-white.svg';
import pin from '@/assets/pin.svg';
import Image from 'next/image';
import { Slider } from '@/components/Slider';
import { PropertyCard } from '@/components/PropertyCard';
import { Modal } from '@/components/Modal';
import { RequestForm } from '@/components/RequestForm';
import { ToastContainer } from 'react-toastify';
import { Map } from '@/components/Map';

interface IPropertyPageView {
  id: string;
  router: any;
}

export const PropertyPageView = observer((props: IPropertyPageView) => {
  const { SearchPageStore } = useContext(StoreContext);
  const router = useRouter();
  const { id } = props;
  const property = SearchPageStore.getPropertyById(id);
  const [isModalOpen, setIsOpen] = useState(false);
  const [mapRef, setMapRef] = useState(null);

  return (
    <div>
      <ToastContainer />
      <div className="flex justify-between items-center mb-[24px]">
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <RequestForm
            onClose={() => {
              setIsOpen(false);
            }}
          />
        </Modal>
        <div>
          <Button
            iconLeft={backArrow}
            variant="transparent"
            color="grey"
            onClick={router.back}
          >
            Back
          </Button>
        </div>
        <div className="flex items-center gap-[8px]">
          <Button iconLeft={share} variant="transparent" color="grey">
            Share
          </Button>
          <Button iconLeft={favorite} variant="transparent" color="grey">
            Save
          </Button>
        </div>
      </div>
      <section className="mb-[56px]">
        <GalleryGrid pictures={property?.pictures} />
      </section>

      <div className="grid grid-cols-12 gap-4 mb-[82px]">
        <div className="col-span-8 p-4">
          <div className="flex justify-between mb-[8px]">
            <Typography type="info">
              ID {property?.property_id} | Listed 23.04.2023
            </Typography>
            <Typography type="info">Villa</Typography>
          </div>
          <Typography type="h1" className="w-5/6 mb-[24px]">
            {strings.removeDuplicateSubstring(
              property?.name || 'Property Name',
            )}
          </Typography>
          <div className="flex justify-between items-center mb-[32px]">
            <Typography type="text">
              {`${property?.country}, ${property?.city} `}
            </Typography>
            <Typography type="text">Avalible 24 Aug</Typography>
          </div>
          <section className="p-[24px] rounded border border-[#D9DBE9] mb-[56px] overflow-hidden">
            <div className="flex items-center">
              <div className="border-r border-r-[#D9DBE9] pr-[40px]">
                <Typography type="info" className="mb-[8px] block">
                  Type
                </Typography>
                <Typography type="h2">{property?.type || '-'}</Typography>
              </div>
              <div className="border-r border-r-[#D9DBE9] px-[40px]">
                <Typography type="info" className="mb-[8px] block">
                  Bedrooms
                </Typography>
                <Typography type="h2">{property?.bedrooms || '-'}</Typography>
              </div>
              <div className="border-r border-r-[#D9DBE9] px-[40px]">
                <Typography type="info" className="mb-[8px] block">
                  Bathrooms
                </Typography>
                <Typography type="h2">{property?.bathrooms || '-'}</Typography>
              </div>
              <div className="border-r border-r-[#D9DBE9] px-[40px]">
                <Typography type="info" className="mb-[8px] block truncate">
                  Internal Area SqFt
                </Typography>
                <Typography type="h2" className="truncate">
                  {property?.internal_area_ft
                    ? `${property?.internal_area_ft}`
                    : '-'}
                </Typography>
              </div>
              <div className="pl-[40px]">
                <Typography type="info" className="truncate">
                  Common Area SqFt
                </Typography>
                <Typography type="h2" className="truncate">
                  {property?.external_area_ft
                    ? `${property?.external_area_ft}`
                    : '-'}
                </Typography>
              </div>
            </div>
          </section>
          <section className="mb-[56px]">
            <Tabs
              tabs={[
                {
                  id: '1',
                  label: 'Description',
                  content: (
                    <div className="textContainer">
                      <TextContainer>
                        <Typography type="paragraph">
                          {property?.description}
                        </Typography>
                      </TextContainer>
                    </div>
                  ),
                },
                {
                  id: '2',
                  label: 'Project',
                  content: (
                    <TextContainer>
                      <Typography type="paragraph">Nothing</Typography>
                    </TextContainer>
                  ),
                },
                {
                  id: '3',
                  label: 'Floorplan',
                  content: (
                    <TextContainer>
                      <Typography type="paragraph">Nothing</Typography>
                    </TextContainer>
                  ),
                },
              ]}
            />
          </section>

          {/*<section className="mb-[56px]">*/}
          {/*  <Typography type="h2" className="mb-[32px]">*/}
          {/*    Amenities*/}
          {/*  </Typography>*/}
          {/*  <ul className="grid grid-cols-2 gap-[12px]">*/}
          {/*    <li className="flex items-center gap-[16px] text-base font-medium">*/}
          {/*      <span className="inline-block w-[24px] h-[24px] rounded-md bg-slate-300"></span>*/}
          {/*      Amenities Title*/}
          {/*    </li>*/}
          {/*    <li className="flex items-center gap-[16px] text-base font-medium">*/}
          {/*      <span className="inline-block w-[24px] h-[24px] rounded-md bg-slate-300"></span>*/}
          {/*      Amenities Title*/}
          {/*    </li>*/}
          {/*    <li className="flex items-center gap-[16px] text-base font-medium">*/}
          {/*      <span className="inline-block w-[24px] h-[24px] rounded-md bg-slate-300"></span>*/}
          {/*      Amenities Title*/}
          {/*    </li>*/}
          {/*    <li className="flex items-center gap-[16px] text-base font-medium">*/}
          {/*      <span className="inline-block w-[24px] h-[24px] rounded-md bg-slate-300"></span>*/}
          {/*      Amenities Title*/}
          {/*    </li>*/}
          {/*    <li className="flex items-center gap-[16px] text-base font-medium">*/}
          {/*      <span className="inline-block w-[24px] h-[24px] rounded-md bg-slate-300"></span>*/}
          {/*      Amenities Title*/}
          {/*    </li>*/}
          {/*    <li className="flex items-center gap-[16px] text-base font-medium">*/}
          {/*      <span className="inline-block w-[24px] h-[24px] rounded-md bg-slate-300"></span>*/}
          {/*      Amenities Title*/}
          {/*    </li>*/}
          {/*    <li className="flex items-center gap-[16px] text-base font-medium">*/}
          {/*      <span className="inline-block w-[24px] h-[24px] rounded-md bg-slate-300"></span>*/}
          {/*      Amenities Title*/}
          {/*    </li>*/}
          {/*    <li className="flex items-center gap-[16px] text-base font-medium">*/}
          {/*      <span className="inline-block w-[24px] h-[24px] rounded-md bg-slate-300"></span>*/}
          {/*      Amenities Title*/}
          {/*    </li>*/}
          {/*  </ul>*/}
          {/*</section>*/}
          <section className="mb-[56px]">
            <Typography type="h2" className="mb-[16px]">
              Location
            </Typography>
            <Typography type="text" className="mb-[32px] flex gap-[8px]">
              <Image src={pin} alt={'pin'} />
              {`${property?.country}, ${property?.city} `}
            </Typography>
            <div className="w-[862px] h-[420px] bg-slate-200 overflow-hidden">
              <Map mapRef={mapRef} setMapRef={setMapRef} />
            </div>
          </section>
          <section className="border border-[#F7F7FC] rounded bg-white p-[24px] mb-[56px]">
            <Typography className="mb-[16px]" type="h2">
              Share property or Save it
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
          <section className="about">
            <Typography type="h2" className="mb-[16px]">
              About Country
            </Typography>
            <Typography type="text">
              Feel like exploring the Dominican? Start the day with a hike on
              one of Playa Moron’s many trails. Weave your way around the gated
              community to find secluded sandy coves for swimming and
              paddleboarding. When you’re ready to chill with friends, the beach
              house pool awaits. Spend the night entertaining in the outdoor
              lounge, sipping drinks in the hot tub, and gazing out over
              incredible ocean views.Copyright © Luxury Retreats. All rights
              reserved.BEDROOM & BATHROOM• Bedroom 1 - Master: King size bed,
              Ensuite bathroom with stand-alone rain shower, Dual vanity,
              Walk-in closet, Television, Sofa, Deck, Balcony, Ocean view...
            </Typography>
          </section>
        </div>
        <div className="col-span-4 p-4">
          <section className="bg-white border border-[#F7F7FC] p-[24px] mb-[8px]">
            <Typography type="info" className="mb-[8px]">
              Price
            </Typography>
            <Typography type="h1" className="mb-[32px]">
              $
              {property?.price_dollar
                ? strings.addSpaces(property.price_dollar.toString())
                : 'Unknown price'}
            </Typography>
            <Button
              className={'w-full flex justify-center'}
              onClick={() => setIsOpen(true)}
            >
              Send enquiry
            </Button>
          </section>
          <section className="bg-white border border-[#F7F7FC] p-[24px]">
            <div className="flex gap-[12px] items-center mb-[32px]">
              <div className="flex items-center justify-center text-white w-[56px] h-[56px] rounded-full bg-primary">
                MJ
              </div>
              <div className="flex flex-col">
                <Typography type="text">Developer Name</Typography>
                <Typography type="info">developer</Typography>
              </div>
            </div>
            <div className="flex gap-[12px] items-center">
              <div className="flex items-center justify-center text-white w-[56px] h-[56px] rounded-[8px] bg-primary">
                MJ
              </div>
              <div className="flex flex-col">
                <Typography type="text">Developer Name</Typography>
                <Typography type="info">developer</Typography>
              </div>
            </div>
          </section>
        </div>
      </div>
      <section className="mb-[56px]">
        <Slider title="Similar properties" itemsPerSlide={4}>
          {SearchPageStore.properties.map((property, index) => (
            <PropertyCard
              key={index}
              property={property}
              title={property.name || ''}
              image={property.pictures ? property.pictures[0] : undefined}
              price={`${property.price_dollar}` || '0'}
              address={`${property.city || ''}, ${property.country}`}
              features={`${property.type} • ${property.bedrooms} bds • ${property.bathrooms} ba • ${property.internal_area_ft} Sq Ft`}
            />
          ))}
        </Slider>
      </section>
    </div>
  );
});

export const PropertyPageContainer = (props: any) => {
  return (
    <StoreProvider>
      <PropertyPageView {...props} />
    </StoreProvider>
  );
};
