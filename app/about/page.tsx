import React from 'react';
import { Typography } from '@/components/Typography';
import { TextContainer } from '@/components/TextContainer';
import heroBg from '@/public/assets/heroBG.jpg';
import Image from 'next/image';
import Button from '@/components/Button';
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
              About Caribbean Real Estate MLS
            </Typography>
            <TextContainer>
              <Typography type="paragraph">
                Feel like exploring the Dominican? Start the day with a hike on
                one of Playa Moron’s many trails. Weave your way around the
                gated community to find secluded sandy coves for swimming and
                paddleboarding. When you’re ready to chill with friends, the
                beach house pool awaits. Spend the night entertaining in the
                outdoor lounge, sipping drinks in the hot tub, and gazing out
                over incredible ocean views.Copyright © Luxury Retreats. All
                rights reserved.BEDROOM & BATHROOM• Bedroom 1 - Master: King
                size bed, Ensuite bathroom with stand-alone rain shower, Dual
                vanity, Walk-in closet, Television, Sofa, Deck, Balcony, Ocean
                view Feel like exploring the Dominican? Start the day with a
                hike on one of Playa Moron’s many trails. Weave your way around
                the gated community to find secluded sandy coves for swimming
                and paddleboarding. When you’re ready to chill with friends, the
                beach house pool awaits. Spend the night entertaining in the
                outdoor lounge, sipping drinks in the hot tub, and gazing out
                over incredible ocean views.Copyright © Luxury Retreats. All
                rights reserved.BEDROOM & BATHROOM• Bedroom 1 - Master: King
                size bed, Ensuite bathroom with stand-alone rain shower, Dual
                vanity, Walk-in closet, Television, Sofa, Deck, Balcony, Ocean
                view...
              </Typography>
            </TextContainer>
          </TextSection>
          <TextSection>
            <Typography type="h2" className="mb-[24px]">
              Mission Statement
            </Typography>
            <Typography type="paragraph">
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
          </TextSection>
          <TextSection>
            <Typography type="h2" className="mb-[24px]">
              Vision Statement
            </Typography>
            <Typography type="paragraph">
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
          </TextSection>
          <TextSection>
            <Typography type="h2" className="mb-[24px]">
              Company Values
            </Typography>
            <Typography type="paragraph">
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
