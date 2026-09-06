import React from 'react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { HeroSection } from '@/components/landing/HeroSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { WhyDermaAsistSection } from '@/components/landing/WhyDermaAsistSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { AIAssessmentSection } from '@/components/landing/AIAssessmentSection';
import { FamilyAccountSection } from '@/components/landing/FamilyAccountSection';
import { RoutineRemindersSection } from '@/components/landing/RoutineRemindersSection';
import { IndianFocusSection } from '@/components/landing/IndianFocusSection';
import { LanguageSupportSection } from '@/components/landing/LanguageSupportSection';
import { PrivacySection } from '@/components/landing/PrivacySection';
import { FAQSection } from '@/components/landing/FAQSection';
import { DisclaimerSection } from '@/components/landing/DisclaimerSection';

const LandingPage: React.FC = () => {
  return (
    <PublicLayout>
      <HeroSection />
      <HowItWorksSection />
      <WhyDermaAsistSection />
      <FeaturesSection />
      <AIAssessmentSection />
      <FamilyAccountSection />
      <RoutineRemindersSection />
      <IndianFocusSection />
      <LanguageSupportSection />
      <PrivacySection />
      <FAQSection />
      <DisclaimerSection />
    </PublicLayout>
  );
};

export default LandingPage;
