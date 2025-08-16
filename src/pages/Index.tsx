import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { InvestmentOpportunities } from '@/components/InvestmentOpportunities';
import { Gallery } from '@/components/Gallery';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { AdminPanel } from '@/components/AdminPanel';
import { useAuth } from '@/hooks/useAuth';
import { useSiteContent } from '@/hooks/useSiteContent';
import { useGallery } from '@/hooks/useGallery';

const Index = () => {
  const { user, loading: authLoading, isAdmin } = useAuth();
  const { siteContent, loading: contentLoading } = useSiteContent();
  const { images, loading: galleryLoading } = useGallery();
  const navigate = useNavigate();

  // Check admin access for admin panel
  const isAdminPanelVisible = window.location.pathname.includes('/admin') || 
                             new URLSearchParams(window.location.search).has('admin');

  useEffect(() => {
    // If accessing admin panel but not authenticated, redirect to auth
    if (isAdminPanelVisible && !authLoading && !user) {
      navigate('/auth');
    }
  }, [isAdminPanelVisible, authLoading, user, navigate]);

  if (authLoading || contentLoading || galleryLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }

  // Show admin panel if requested and user is authenticated
  if (isAdminPanelVisible && user) {
    return <AdminPanel />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero content={siteContent.hero} />
        <InvestmentOpportunities />
        <Gallery images={images} />
        <About content={siteContent.about} />
        <Contact content={siteContent.contact} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
