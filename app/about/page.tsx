import React from 'react';
import { Typography } from '@/components/Typography';
import { TextContainer } from '@/components/TextContainer';
import heroBg from '@/public/assets/heroBG.jpg';
import Image from 'next/image';
import logoWhite from '@/public/assets/logo_white.svg';
import RequestModal from '@/app/about/components/RequestModal';
import Contacts from '@/app/about/components/Contacts';
import { CTABlock } from '@/components/CTABlock';

const TextSection = ({ children }: { children: React.ReactElement[] }) => (
  <section className="mb-[32px]">{children}</section>
);
const AboutPage = () => {
  return (
    <div>
      <RequestModal />
      <section className="mb-[56px] relative">
        <Image
          src={heroBg}
          alt="heroBG"
          height={500}
          width={1344}
          className="rounded max-h-[500px] w-full object-cover brightness-90"
        />
        <Image
          src={logoWhite}
          alt="logo"
          width={305}
          height={78}
          className="absolute bottom-[72px] left-[64px]"
        />
      </section>
      <div className="grid grid-cols-12 gap-[32px]">
        <div className="col-span-8">
          <TextSection>
            <Typography type="h1" className="mb-[32px]">
              Welcome to Caribbean Real Estate MLS – Your #1 Source for
              Caribbean Real Estate Listings, New and Information!
            </Typography>
            <TextContainer>
              <Typography type="paragraph">
                From the exclusive smaller islands of Anguilla, St. Lucia, and
                Barbados to the vibrant beach communities of Costa Rica, Panama,
                Mexico, and more, the Caribbean Real Estate MLS has established
                itself as a leading real estate Multiple Listing Service in the
                Caribbean region. Our web and mobile platform is the ultimate
                place to explore Caribbean real estate for sale, whether you're
                in search of new condos in the Dominican Republic or lavish
                beach houses in The Bahamas. With an extensive range of listings
                covering the entire region – from the Turks & Caicos Islands in
                the north to Aruba, Bonaire, and Curacao in the south – we
                showcase properties of all types, catering to all lifestyles and
                budgets. Our network of highly experienced professionals offers
                insider access to the leading experts in Caribbean property
                markets and exclusive access to pre-construction developments in
                the region. We provide unmatched guidance to help you find your
                ideal island home, high-yield investment, or idyllic vacation
                getaway. At Caribbean Real Estate MLS, we are dedicated to
                helping you find your own slice of paradise in this unrivalled
                region. The Caribbean lifestyle you've always dreamed of is
                closer than you imagine, and Caribbean Real Estate MLS is your
                key to unlocking the best of the region.
              </Typography>
            </TextContainer>
          </TextSection>
          <Typography type="h1" className="mb-[32px]">
            Why Choose Caribbean Real Estate MLS?
          </Typography>
          <TextSection>
            <Typography type="h2" className="mb-[24px]">
              Work are Connected to Local Caribbean Real Estate Agents:
            </Typography>
            <Typography type="paragraph">
              We've spent years building a powerful network of handpicked
              partners – trusted real estate agents and property developers
              across the Caribbean. These experts meet our strict criteria in
              terms of market experience, local reputation, and professionalism.
              By tapping into our exclusive network, you gain access to
              professionals from across the region with unparalleled knowledge
              of local property markets and unique market drivers. This enables
              us to perfectly match you with the property that suits your needs,
              lifestyle, investment goals, and budget.
            </Typography>
          </TextSection>
          <TextSection>
            <Typography type="h2" className="mb-[24px]">
              A One-Stop Shop for Caribbean Real Estate Listing and Information
            </Typography>
            <Typography type="paragraph">
              With the largest database of residential and commercial real
              estate spanning the entire Caribbean and Central America, we are
              uniquely positioned to assist you in finding your perfect
              property. Our web platform serves as a one-stop shop for searching
              Caribbean real estate, showcasing an incredibly diverse range of
              listings across the region. From picturesque islands in the
              turquoise waters of the Caribbean Sea to vibrant countries in
              Central America bordering it, we cover it all.
            </Typography>
          </TextSection>
          <TextSection>
            <Typography type="h2" className="mb-[24px]">
              Discover a Selection of Properties for Every Budget and Lifestyle:
            </Typography>
            <Typography type="paragraph">
              At Caribbean Real Estate MLS we cater to your unique lifestyle
              preferences, offering a wide range of properties at every budget.
              Whether you dream of coastal living with beachfront homes and
              condos, waterfront properties for boating enthusiasts, golf real
              estate along lush fairways, secluded mountain, rainforest, and
              jungle hideaways, or one-of-a-kind historic homes and island
              estates, we have something to suit everyone. You'll find
              affordable homes and condos under $200,000, perfect for
              entry-level investors, as well as high-quality mid-range
              properties for those looking to invest more. For those seeking the
              pinnacle of refined Caribbean living, our collection includes
              one-of-a-kind lavish estates and luxury real estate.
            </Typography>
          </TextSection>
          <TextSection>
            <Typography type="h2" className="mb-[24px]">
              Citizenship by Investment in the Caribbean:
            </Typography>
            <Typography type="paragraph">
              Second passports have transcended the realm of fictional spy
              stories and are now becoming a tangible reality for successful
              businessmen, immigrant investors, and individuals with a desire
              for global citizenship. For individuals and families exploring the
              benefits of acquiring a second citizenship or residence, we
              showcase select properties approved for citizenship by investment
              programs in various Caribbean nations. These programs allow
              individuals to invest in real estate in exchange for second
              citizenship in idyllic island nations, providing benefits such as
              visa-free international travel, tax advantages, and increased
              global mobility.
            </Typography>
          </TextSection>
          <TextSection>
            <Typography type="h2" className="mb-[24px]">
              Venture Beyond – Discover Central America Real Estate:
            </Typography>
            <Typography type="paragraph">
              At Caribbean Real Estate MLS, we take pride in offering not just a
              window into the real estate in Caribbean islands, but also an a
              gateway to the finest real estate in select Central American
              jurisdictions. Embark on a journey of discovery as we invite you
              to explore the captivating countries of Belize, Costa Rica,
              Mexico, Nicaragua, and Panama, all of which boast an array of
              exceptional properties waiting to be uncovered.
            </Typography>
          </TextSection>
          <TextSection>
            <Typography type="h2" className="mb-[24px]">
              Caribbean Commercial Real Estate for the Savvy Investor:
            </Typography>
            <Typography type="paragraph">
              For investors and entrepreneurs, our web platform showcases
              commercial real estate opportunities across the Caribbean region.
              From hotels and resorts for sale to large parcels of vacant land
              ready for custom hospitality, tourism, and recreational projects,
              we offer a chance to invest in this dynamic and lucrative region.
            </Typography>
          </TextSection>
          <TextSection>
            <Typography type="h2" className="mb-[24px]">
              Find Your Perfect Property in the Caribbean – Let Us Guide You to
              Your Paradise:
            </Typography>
            <Typography type="paragraph">
              Whether you dream of a new island property to call home, a
              blissful hideaway for relaxing vacations, or a lucrative
              investment property, Caribbean Real Estate MLS offers a netowrk of
              unrivalled knowledge and expertise in Caribbean real estate.
              Contact us today to begin your journey – and connect with our team
              of experts ready to help you every step of the way.
            </Typography>
          </TextSection>
          <TextSection>
            <Typography type="h2" className="mb-[24px]">
              Sellers, Showcase Your Properties to the World:
            </Typography>
            <Typography type="paragraph">
              If you are a real estate agent, developer, or individual owner
              looking to sell Caribbean property, Caribbean Real Estate MLS is
              here to help. We provide sellers with a direct route to motivated
              buyers across the globe. Learn more about how our services for
              sellers can showcase your property listings to reach the widest
              possible audience.
            </Typography>
          </TextSection>
          <CTABlock />
        </div>
        <div className="col-span-4">
          <Contacts />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
