import React, { useState, useEffect } from 'react';
import { Trophy, MapPin, Settings, Star, Users, TrendingUp, Award, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { siteData } from '@/data/siteData.js';

export const About: React.FC = () => {
  const [visibleStats, setVisibleStats] = useState<number[]>([]);
  const [visibleFeatures, setVisibleFeatures] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const type = entry.target.getAttribute('data-type');
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            
            if (type === 'stat') {
              setVisibleStats((prev) => [...prev, index]);
            } else if (type === 'feature') {
              setVisibleFeatures((prev) => [...prev, index]);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    const elements = document.querySelectorAll('[data-type][data-index]');
    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case 'trophy': return <Trophy className="w-8 h-8 text-primary" />;
      case 'map-pin': return <MapPin className="w-8 h-8 text-primary" />;
      case 'settings': return <Settings className="w-8 h-8 text-primary" />;
      case 'star': return <Star className="w-8 h-8 text-primary" />;
      default: return <Award className="w-8 h-8 text-primary" />;
    }
  };

  const animateNumber = (target: string, index: number) => {
    const numericValue = parseInt(target.replace(/[^0-9]/g, ''));
    if (isNaN(numericValue)) return target;

    const element = document.getElementById(`stat-${index}`);
    if (!element || visibleStats.includes(index)) return target;

    let current = 0;
    const increment = numericValue / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        current = numericValue;
        clearInterval(timer);
      }
      element.textContent = target.replace(numericValue.toString(), Math.floor(current).toString());
    }, 30);

    return target;
  };

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 mb-6 bg-primary/10 rounded-full border border-primary/20">
            <Users className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm font-medium text-primary">About Kiritara</span>
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-foreground">
            {siteData.about.title}
          </h2>
          
          <p className="text-xl text-muted-foreground mb-4 max-w-3xl mx-auto">
            {siteData.about.subtitle}
          </p>
          
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
            {siteData.about.description}
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {siteData.about.stats.map((stat, index) => (
            <Card 
              key={stat.label}
              data-type="stat"
              data-index={index}
              className={`text-center p-6 luxury-shadow hover-lift transform transition-all duration-700 ${
                visibleStats.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <CardContent className="p-0">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-4 animate-luxury-pulse">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h3 
                    id={`stat-${index}`}
                    className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2"
                  >
                    {visibleStats.includes(index) ? animateNumber(stat.number, index) : stat.number}
                  </h3>
                  <p className="text-muted-foreground font-medium">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {siteData.about.features.map((feature, index) => (
            <Card 
              key={feature.title}
              data-type="feature"
              data-index={index}
              className={`p-6 luxury-shadow hover-lift group transform transition-all duration-700 ${
                visibleFeatures.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-0">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                    {getFeatureIcon(feature.icon)}
                  </div>
                  <h3 className="font-display text-xl font-bold mb-3 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-gold/10 rounded-2xl p-8 border border-primary/20 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="flex -space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-12 h-12 bg-gradient-gold rounded-full border-2 border-background flex items-center justify-center">
                    <Star className="w-6 h-6 text-white fill-current" />
                  </div>
                ))}
              </div>
            </div>
            
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-4 text-foreground">
              Ready to Join Our Exclusive Network?
            </h3>
            
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Connect with our investment specialists to explore premium opportunities tailored to your portfolio and investment goals.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4 text-primary" />
                <span>SEC Registered</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Award className="w-4 h-4 text-primary" />
                <span>Industry Awards</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4 text-primary" />
                <span>1000+ Satisfied Investors</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};