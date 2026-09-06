import React from 'react';
import { cn } from '@/lib/utils';

export const Logo: React.FC<{ className?: string, iconOnly?: boolean }> = ({ className, iconOnly = false }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-accent-600 shadow-sm">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" opacity="0.3" fill="currentColor"/>
          <path d="M12 6V12L16 14" />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
      </div>
      {!iconOnly && (
        <span className="font-heading text-xl font-bold tracking-tight text-slate-900">
          Derma<span className="text-primary-600">Asist</span>
        </span>
      )}
    </div>
  );
};
