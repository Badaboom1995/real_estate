import '../globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { Inter } from 'next/font/google';
import { Header } from '@/components/Header';
import cn from 'classnames';
const inter = Inter({ subsets: ['latin'] });
import { headers } from 'next/headers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  console.log(headersList.get('referer'));
  return (
    <html lang="en">
      <body className={cn('bg-[#FCFCFC]', inter.className)}>
        <Header />
        <div className={'min-w-[1200px] max-w-[1440px] px-[48px] m-auto'}>
          <div className="">{children}</div>
        </div>
        <footer className="p-10 bg-[#262338]">Footer</footer>
      </body>
    </html>
  );
}
