import React from 'react';
import { Typography } from '@/components/Typography';

interface ContactsProps {
  developer?: string;
  agent?: string;
}
export function Contacts(props: ContactsProps) {
  const { developer, agent } = props;
  return (
    <section className="bg-white border border-[#F7F7FC] p-[24px]">
      {developer && (
        <div className="flex gap-[12px] items-center mb-[32px]">
          <div className="flex items-center justify-center text-white w-[56px] h-[56px] rounded-full bg-primary">
            MJ
          </div>
          <div className="flex flex-col">
            <Typography type="text">{developer}</Typography>
            <Typography type="info">developer</Typography>
          </div>
        </div>
      )}
      {agent && (
        <div className="flex gap-[12px] items-center">
          <div className="flex items-center justify-center text-white w-[56px] h-[56px] rounded-[8px] bg-primary">
            MJ
          </div>
          <div className="flex flex-col">
            <Typography type="text">{agent}</Typography>
            <Typography type="info">developer</Typography>
          </div>
        </div>
      )}
    </section>
  );
}
