import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { FamilyProvider } from './context/FamilyContext';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { LoadingScreen } from './components/common/LoadingScreen';
import { ToastProvider, ToastViewport } from './components/ui/toast';
import './i18n';

// Lazy loaded pages
const LandingPage = React.lazy(() => import('./pages/LandingPage'));
const DashboardPage = React.lazy(() => import('./pages/DashboardPage'));
const NewAssessmentPage = React.lazy(() => import('./pages/NewAssessmentPage'));
const QuestionnairePage = React.lazy(() => import('./pages/QuestionnairePage'));
const AnalyzingPage = React.lazy(() => import('./pages/AnalyzingPage'));
const ResultsPage = React.lazy(() => import('./pages/ResultsPage'));
const HistoryPage = React.lazy(() => import('./pages/HistoryPage'));
const FamilyPage = React.lazy(() => import('./pages/FamilyPage'));
const RemindersPage = React.lazy(() => import('./pages/RemindersPage'));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage'));
const SupportPage = React.lazy(() => import('./pages/SupportPage'));
const AdminPage = React.lazy(() => import('./pages/AdminPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <FamilyProvider>
            <ToastProvider>
              <BrowserRouter>
                <Suspense fallback={<LoadingScreen />}>
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<LandingPage />} />
                    
                    {/* Bypassed Auth Routes */}
                    <Route path="/login" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/register" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/forgot-password" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/reset-password" element={<Navigate to="/dashboard" replace />} />
                    
                    {/* Protected Routes */}
                    <Route element={<ProtectedRoute />}>
                      <Route path="/dashboard" element={<DashboardPage />} />
                      <Route path="/assessment/new" element={<NewAssessmentPage />} />
                      <Route path="/assessment/:id/questionnaire" element={<QuestionnairePage />} />
                      <Route path="/assessment/:id/analyzing" element={<AnalyzingPage />} />
                      <Route path="/assessment/:id/results" element={<ResultsPage />} />
                      <Route path="/history" element={<HistoryPage />} />
                      <Route path="/family" element={<FamilyPage />} />
                      <Route path="/reminders" element={<RemindersPage />} />
                      <Route path="/profile" element={<ProfilePage />} />
                      <Route path="/support" element={<SupportPage />} />
                      <Route path="/admin" element={<AdminPage />} />
                    </Route>
                    
                    {/* 404 Route */}
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </Suspense>
              </BrowserRouter>
              <ToastViewport />
            </ToastProvider>
          </FamilyProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
