'use client';
import React from 'react';
import { Typography } from '@/components/Typography';
import Button from '@/components/Button';
import { RequestForm } from '@/components/RequestForm';
import { Modal } from '@/components/Modal';

export const CTABlock = () => {
  const [requestOpen, setRequestOpen] = React.useState(false);
  return (
    <div className="bg-primary rounded p-[32px] mb-[120px] mt-[96px]">
      <Modal
        isOpen={requestOpen}
        onClose={() => {
          setRequestOpen(false);
        }}
      >
        <RequestForm
          onClose={() => {
            setRequestOpen(false);
          }}
        />
      </Modal>
      <Typography type="h2" className="text-white mb-[16px]">
        Speak with an Expert
      </Typography>
      <Typography type="paragraph" className="text-white mb-[32px]">
        Feel like exploring the Dominican? Start the day with a hike on one of
        Playa Moron’s many trails. Weave your way around the gated community to
        find secluded sandy coves for swimming and paddleboarding.
      </Typography>
      <Button
        color="white"
        onClick={() => {
          setRequestOpen(true);
        }}
      >
        Request a property
      </Button>
    </div>
  );
};
