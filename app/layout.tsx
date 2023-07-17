import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { Inter } from 'next/font/google';
import { Header } from '@/components/Header';
import cn from 'classnames';
import { ToastContainer } from 'react-toastify';
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn('bg-[#FCFCFC]', inter.className)}>
        <Header />
        <div className={'min-w-[1200px] max-w-[1440px] px-[48px] m-auto'}>
          <div className="">{children}</div>
          {/*<p>Footer</p>*/}
        </div>
        <footer className="p-10 bg-[#262338]">Footer</footer>
      </body>
    </html>
  );
}
