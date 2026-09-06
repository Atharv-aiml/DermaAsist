import React from 'react';
import { Header } from './Header';
import { MobileNav } from './MobileNav';
import { useAuth } from '@/hooks/useAuth';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-8">
        {children}
      </main>
      {isAuthenticated && <MobileNav />}
    </div>
  );
};
