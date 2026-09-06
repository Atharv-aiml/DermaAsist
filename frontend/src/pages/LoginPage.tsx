import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { authService } from '@/services/auth.service';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('rahul@example.com');
  const [password, setPassword] = useState('Demo@1234');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      loginSchema.parse({ email, password });
      const response = await authService.login({ email, password });
      login(response.data.token, response.data.user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.errors ? t('errors.validationError') : t('errors.unauthorized'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PublicLayout>
      <div className="flex items-center justify-center min-h-[calc(100vh-140px)] py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 items-center text-center">
            <CardTitle className="text-2xl">{t('auth.login')}</CardTitle>
            <CardDescription>{t('auth.hasAccount')}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t('auth.email')}</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="m@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">{t('auth.password')}</Label>
                  <Link to="/forgot-password" className="text-sm font-medium text-primary-600 hover:underline">
                    {t('auth.forgotPassword')}
                  </Link>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
              {error && <p className="text-sm text-danger-600 font-medium">{error}</p>}
              <Button type="submit" className="w-full" isLoading={isLoading}>
                {t('auth.submit')}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 items-center">
            <div className="text-sm text-slate-500">
              {t('auth.noAccount')} <Link to="/register" className="text-primary-600 font-medium hover:underline">{t('auth.register')}</Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </PublicLayout>
  );
};

export default LoginPage;
