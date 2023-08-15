'use client';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { Inter } from 'next/font/google';
import { Header } from '@/components/Header';
import cn from 'classnames';
import { Footer } from '@/components/Footer';
import { RecoilRoot } from 'recoil';
const inter = Inter({ subsets: ['latin'] });
import { usePathname } from 'next/navigation';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-loading-skeleton/dist/skeleton.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className={cn('bg-[#FCFCFC]', inter.className)}>
        <RecoilRoot>
          <Header />
          <div
            className={`min-w-[1200px] pl-[48px] m-auto ${
              pathname !== '/search' && 'max-w-[1440px]'
            }`}
          >
            <div>{children}</div>
          </div>
        </RecoilRoot>
        {pathname !== '/search' && <Footer />}
      </body>
    </html>
  );
}
