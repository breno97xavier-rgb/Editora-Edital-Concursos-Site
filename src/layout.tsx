import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

import SEO from '../components/SEO';
import BannerCookies from '../components/BannerCookies';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isLP = location.pathname.startsWith('/lp/');
  const isAdmin = location.pathname.startsWith('/admin');
  const isCustomLayout = isLP || isAdmin;

  return (
    <div className="min-h-screen flex flex-col font-corpo bg-branco text-cinza-escuro">
      {!isAdmin && <SEO />}
      {!isCustomLayout && <Header />}
      <main className={`flex-grow ${!isCustomLayout ? 'pt-20 md:pt-[84px]' : ''}`}>
        {children}
      </main>
      {!isCustomLayout && <Footer />}
      {!isAdmin && <BannerCookies />}
    </div>
  );
}
