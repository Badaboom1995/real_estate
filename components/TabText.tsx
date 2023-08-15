import React from 'react';
import { TextContainer } from '@/components/TextContainer';
import { Typography } from '@/components/Typography';

export function TabText(props: { children: React.ReactNode }) {
  return (
    <TextContainer>
      <Typography type="paragraph">{props.children}</Typography>
    </TextContainer>
  );
}
