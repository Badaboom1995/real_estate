'use client';
import React from 'react';
import { RecoilRoot } from 'recoil';

const RecoilProvider = ({ children }: any) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default RecoilProvider;
