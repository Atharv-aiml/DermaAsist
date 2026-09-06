import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Home, Camera, Clock, Users, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export const MobileNav: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: t('nav.home'), path: '/dashboard' },
    { icon: Camera, label: t('nav.newCheck'), path: '/assessment/new' },
    { icon: Clock, label: t('nav.history'), path: '/history' },
    { icon: Users, label: t('nav.family'), path: '/family' },
    { icon: User, label: t('nav.profile'), path: '/profile' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 pb-safe">
      <nav className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path) || (item.path === '/dashboard' && location.pathname === '/dashboard');
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
                isActive ? "text-primary-600" : "text-slate-500 hover:text-slate-900"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive && "fill-primary-50")} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
