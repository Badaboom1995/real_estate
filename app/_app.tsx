'use client';
import React from 'react';
import { Inter } from 'next/font/google';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-loading-skeleton/dist/skeleton.css';

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] });

export default function MyApp({ Component, pageProps }: any) {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  );
}
