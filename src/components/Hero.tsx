import React, { useEffect, useState } from 'react';
import { ChevronDown, Play, Shield, TrendingUp, Award, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-resort.jpg';

interface HeroProps {
  content?: {
    title?: string;
    subtitle?: string;
    description?: string;
    primaryCTA?: { text: string };
    secondaryCTA?: { text: string };
    features?: string[];
  };
}

export const Hero: React.FC<HeroProps> = ({ content }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToInvestments = () => {
    const element = document.querySelector('#investments');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-110 transition-transform duration-[20s] ease-out"
        style={{
          backgroundImage: `url(${heroImage})`,
          transform: `scale(1.1) translateX(${mousePosition.x * 0.01}px) translateY(${mousePosition.y * 0.01}px)`
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-overlay" />
      
      {/* Animated Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className={`transform transition-all duration-1500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 mb-6 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
            <Award className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm font-medium">Exclusive Investment Opportunities</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="block">{content?.title?.split(' ').slice(0, 2).join(' ') || 'Exclusive Investment'}</span>
            <span className="block text-gradient-gold">
              {content?.title?.split(' ').slice(2).join(' ') || 'Opportunities'}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-4 text-gray-200 font-light max-w-3xl mx-auto">
            {content?.subtitle || 'Discover Premium Resort Properties'}
          </p>

          {/* Description */}
          <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {content?.description || 'Join the elite circle of investors in luxury resort properties.'}
          </p>

          {/* Feature Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-2xl mx-auto">
            {(content?.features || ['High ROI', 'Premium Locations', 'Luxury Amenities', 'Expert Management']).map((feature, index) => (
              <div 
                key={feature}
                className={`p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 transform transition-all duration-1000 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center justify-center mb-2">
                  {index === 0 && <TrendingUp className="w-5 h-5 text-primary" />}
                  {index === 1 && <Star className="w-5 h-5 text-primary" />}
                  {index === 2 && <Shield className="w-5 h-5 text-primary" />}
                  {index === 3 && <Award className="w-5 h-5 text-primary" />}
                </div>
                <p className="text-sm font-medium">{feature}</p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button 
              size="lg"
              className="btn-luxury text-lg px-8 py-4 animate-luxury-pulse"
              onClick={scrollToInvestments}
            >
              <TrendingUp className="w-5 h-5 mr-2" />
              {content?.primaryCTA?.text || 'Explore Opportunities'}
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="btn-ghost-luxury text-lg px-8 py-4"
              onClick={scrollToContact}
            >
              <Play className="w-5 h-5 mr-2" />
              {content?.secondaryCTA?.text || 'Schedule Consultation'}
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="animate-bounce">
            <button
              onClick={scrollToInvestments}
              className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300"
              aria-label="Scroll to investments"
            >
              <ChevronDown className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-10 left-10 hidden lg:block">
        <div className="glass-effect p-6 rounded-xl max-w-xs">
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse" />
            <span className="text-sm font-medium text-white">Live Statistics</span>
          </div>
          <p className="text-2xl font-bold text-white mb-1">$2.1B+</p>
          <p className="text-sm text-gray-300">Assets Under Management</p>
        </div>
      </div>

      <div className="absolute bottom-10 right-10 hidden lg:block">
        <div className="glass-effect p-6 rounded-xl max-w-xs">
          <div className="flex items-center mb-2">
            <Star className="w-4 h-4 text-primary mr-2" />
            <span className="text-sm font-medium text-white">Investor Rating</span>
          </div>
          <div className="flex items-center">
            <p className="text-2xl font-bold text-white mr-2">4.9</p>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-primary fill-current" />
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-300">Average Returns: 22%</p>
        </div>
      </div>
    </section>
  );
};