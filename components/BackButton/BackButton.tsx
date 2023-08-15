'use client';
import React from 'react';
import backArrow from '@/public/assets/backArrow.svg';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      iconLeft={backArrow}
      variant="transparent"
      color="grey"
      onClick={() => {
        router.back();
      }}
    >
      Back
    </Button>
  );
};

export default BackButton;
