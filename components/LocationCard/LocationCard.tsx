import React from 'react';
import { Typography } from '@/components/Typography';
import Link from 'next/link';
import arrow from '@/public/assets/blackArrow.svg';
import Image from 'next/image';

export const LocationCard = (props: {
  placeName: string;
  url: string;
  link: string;
}) => {
  const { placeName, url, link } = props;
  return (
    <div
      className="flex flex-col justify-end h-[520px] w-[320px] bg-blue-400 px-[32px] py-[28px] rounded backdrop-brightness-50"
      style={{
        backgroundImage: `url('${url}')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <Typography type="text" className="text-white">
        Discover
      </Typography>
      <Typography type="h2" className="text-white flex justify-between">
        <span>{placeName}</span>
        <Link href={link || '/'}>
          <button className="rotate-180 p-2 rounded-full bg-white">
            <Image src={arrow} alt="location link" />
          </button>
        </Link>
      </Typography>
    </div>
  );
};
