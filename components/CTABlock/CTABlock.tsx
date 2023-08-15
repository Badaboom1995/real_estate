import React from 'react';
import { Typography } from '@/components/Typography';
import Button from '@/components/Button';

export const CTABlock = () => {
  return (
    <div className="bg-primary rounded p-[32px] mb-[120px] mt-[96px]">
      <Typography type="h2" className="text-white mb-[16px]">
        Speak with an Expert
      </Typography>
      <Typography type="paragraph" className="text-white mb-[32px]">
        Feel like exploring the Dominican? Start the day with a hike on one of
        Playa Moron’s many trails. Weave your way around the gated community to
        find secluded sandy coves for swimming and paddleboarding.
      </Typography>
      <Button color="white">Request a property</Button>
    </div>
  );
};
