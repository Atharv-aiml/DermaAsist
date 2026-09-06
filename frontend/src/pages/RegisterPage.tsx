import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { authService } from '@/services/auth.service';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const RegisterPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords don't match");
      }
      const response = await authService.register(formData);
      register(response.data.token, response.data.user);
      navigate('/dashboard');
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <PublicLayout>
      <div className="flex items-center justify-center min-h-[calc(100vh-140px)] py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 items-center text-center">
            <CardTitle className="text-2xl">{t('auth.register')}</CardTitle>
            <CardDescription>{t('auth.noAccount')}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">{t('auth.fullName')}</Label>
                <Input id="fullName" type="text" value={formData.fullName} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t('auth.email')}</Label>
                <Input id="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t('auth.password')}</Label>
                <Input id="password" type="password" value={formData.password} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t('auth.confirmPassword')}</Label>
                <Input id="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required />
              </div>
              <Button type="submit" className="w-full" isLoading={isLoading}>
                {t('auth.submit')}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 items-center">
            <div className="text-sm text-slate-500">
              {t('auth.hasAccount')} <Link to="/login" className="text-primary-600 font-medium hover:underline">{t('auth.login')}</Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </PublicLayout>
  );
};

export default RegisterPage;
