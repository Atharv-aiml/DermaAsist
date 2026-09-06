import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';
import { Logo } from './Logo';
import { LanguageSelector } from './LanguageSelector';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, Menu, User as UserIcon, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link to={isAuthenticated ? '/dashboard' : '/'}>
            <Logo />
          </Link>
          {isAuthenticated && (
            <nav className="hidden md:flex gap-6">
              <Link to="/dashboard" className="text-sm font-medium text-slate-600 hover:text-primary-600">{t('nav.dashboard')}</Link>
              <Link to="/assessment/new" className="text-sm font-medium text-slate-600 hover:text-primary-600">{t('nav.newCheck')}</Link>
              <Link to="/history" className="text-sm font-medium text-slate-600 hover:text-primary-600">{t('nav.history')}</Link>
              <Link to="/family" className="text-sm font-medium text-slate-600 hover:text-primary-600">{t('nav.family')}</Link>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <LanguageSelector />
          
          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="icon" className="hidden sm:flex text-slate-500">
                <Bell className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary-100 text-primary-700">{user?.fullName.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user?.fullName}</p>
                      <p className="text-sm text-slate-500">{user?.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <UserIcon className="mr-2 h-4 w-4" />
                    {t('nav.profile')}
                  </DropdownMenuItem>
                  {user?.role === 'admin' && (
                    <DropdownMenuItem onClick={() => navigate('/admin')}>
                      {t('nav.admin')}
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-danger-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    {t('nav.signOut')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost">{t('nav.signIn')}</Button>
              </Link>
              <Link to="/register">
                <Button>{t('nav.signUp')}</Button>
              </Link>
            </div>
          )}
          
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
