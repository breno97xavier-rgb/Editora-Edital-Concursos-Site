import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isLP = location.pathname.startsWith('/lp/');

  return (
    <div className="min-h-screen flex flex-col font-corpo bg-branco text-cinza-escuro">
      {!isLP && <Header />}
      <main className={`flex-grow ${!isLP ? 'pt-[112px] md:pt-[160px]' : ''}`}>
        {children}
      </main>
      {!isLP && <Footer />}
    </div>
  );
}
