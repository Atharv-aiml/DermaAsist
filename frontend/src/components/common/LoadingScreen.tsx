import React from 'react';
import { Loader2 } from 'lucide-react';
import { Logo } from '@/components/layout/Logo';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 space-y-6">
      <Logo className="scale-150" />
      <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
    </div>
  );
};
