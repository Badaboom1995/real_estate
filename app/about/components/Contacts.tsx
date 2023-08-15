'use client';
import React, { useState } from 'react';
import { Typography } from '@/components/Typography';
import Button from '@/components/Button';
import fb from '@/public/assets/fb.svg';
import Link from 'next/link';
import wa from '@/public/assets/wa.svg';
import { Modal } from '@/components/Modal';
import { RequestForm } from '@/components/RequestForm';

const Contacts = () => {
  const [isModalOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white rounded p-[24px]">
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
      <Typography type="h2" className="mb-[16px]">
        Caribbean Real Estate MLS
      </Typography>
      <Typography type="text" className="mb-[32px] inline-block">
        Jl. Tanah Ayu, Sibang Gede, Kec. Abiansemal, Bali 80352
      </Typography>
      <Typography type="info" className="mb-[8px]">
        Phone number
      </Typography>
      <Typography type="h2" className="mb-[16px]">
        +7 923 314 2121
      </Typography>
      <Typography type="info" className="mb-[8px]">
        E-mail
      </Typography>
      <Typography type="h2" className="mb-[32px]">
        email@email.com
      </Typography>
      <Button
        className="w-full justify-center mb-[32px]"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Contact
      </Button>
      <div className="grid grid-cols-2 gap-[8px]">
        <Button variant="transparent" color="grey" iconLeft={fb}>
          <Link href="app/about/components"> Facebook</Link>
        </Button>
        <Button
          variant="transparent"
          color="grey"
          className="px-[16px]"
          iconLeft={wa}
        >
          <Link href="app/about/components">WhatsApp</Link>
        </Button>
      </div>
    </div>
  );
};

export default Contacts;
