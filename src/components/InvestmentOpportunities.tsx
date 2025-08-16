import React, { useState, useEffect } from 'react';
import { MapPin, TrendingUp, Clock, Users, ChevronRight, Shield, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { siteData } from '@/data/siteData.js';
import maldivesImage from '@/assets/maldives-resort.jpg';
import swissImage from '@/assets/swiss-resort.jpg';
import santoriniImage from '@/assets/santorini-resort.jpg';

const imageMap: Record<string, string> = {
  '/src/assets/maldives-resort.jpg': maldivesImage,
  '/src/assets/swiss-resort.jpg': swissImage,
  '/src/assets/santorini-resort.jpg': santoriniImage,
};

export const InvestmentOpportunities: React.FC = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [selectedOpportunity, setSelectedOpportunity] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardIndex = parseInt(entry.target.getAttribute('data-card-index') || '0');
            setVisibleCards((prev) => [...prev, cardIndex]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = document.querySelectorAll('[data-card-index]');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'Limited': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'New': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <section id="investments" className="py-20 bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 mb-6 bg-primary/10 rounded-full border border-primary/20">
            <TrendingUp className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm font-medium text-primary">Premium Investments</span>
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-foreground">
            {siteData.investments.title}
          </h2>
          
          <p className="text-xl text-muted-foreground mb-4 max-w-3xl mx-auto">
            {siteData.investments.subtitle}
          </p>
          
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
            {siteData.investments.description}
          </p>
        </div>

        {/* Investment Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {siteData.investments.opportunities.map((opportunity, index) => (
            <Card 
              key={opportunity.id}
              data-card-index={index}
              className={`group relative overflow-hidden luxury-shadow hover-lift cursor-pointer transform transition-all duration-700 ${
                visibleCards.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              onClick={() => setSelectedOpportunity(selectedOpportunity === opportunity.id ? null : opportunity.id)}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={imageMap[opportunity.image] || opportunity.image}
                  alt={opportunity.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-overlay opacity-60" />
                
                {/* Status Badge */}
                <Badge className={`absolute top-4 left-4 ${getStatusColor(opportunity.status)}`}>
                  {opportunity.status}
                </Badge>
                
                {/* Expected Return */}
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md rounded-lg px-3 py-2">
                  <p className="text-white font-bold text-lg">{opportunity.expectedReturn}</p>
                  <p className="text-white/80 text-xs">Expected Return</p>
                </div>
              </div>

              <CardHeader className="pb-4">
                <CardTitle className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-xl font-bold mb-2">{opportunity.title}</h3>
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{opportunity.location}</span>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${
                    selectedOpportunity === opportunity.id ? 'rotate-90' : ''
                  }`} />
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <p className="font-bold text-lg text-foreground">{opportunity.minInvestment}</p>
                    <p className="text-sm text-muted-foreground">Min Investment</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <p className="font-bold text-lg text-foreground">{opportunity.duration}</p>
                    <p className="text-sm text-muted-foreground">Duration</p>
                  </div>
                </div>

                {/* Availability */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Availability</span>
                    <span className="text-sm text-primary">{opportunity.availability}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-gold h-2 rounded-full transition-all duration-1000"
                      style={{ 
                        width: opportunity.availability,
                        transitionDelay: `${index * 200}ms`
                      }}
                    />
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-4">{opportunity.description}</p>

                {/* Expanded Content */}
                <div className={`transition-all duration-500 overflow-hidden ${
                  selectedOpportunity === opportunity.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="border-t border-border pt-4">
                    <h4 className="font-semibold mb-3 flex items-center">
                      <Award className="w-4 h-4 mr-2 text-primary" />
                      Premium Features
                    </h4>
                    <ul className="space-y-2 mb-4">
                      {opportunity.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <Button className="btn-luxury w-full">
                      <Shield className="w-4 h-4 mr-2" />
                      Request Information
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-gold/10 rounded-2xl p-8 border border-primary/20">
          <h3 className="font-display text-2xl font-bold mb-4">Ready to Explore Premium Opportunities?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Schedule a private consultation with our investment specialists to discuss opportunities tailored to your portfolio.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="btn-luxury">
              <Users className="w-4 h-4 mr-2" />
              Schedule Consultation
            </Button>
            <Button variant="outline" className="btn-ghost-luxury">
              <Clock className="w-4 h-4 mr-2" />
              Download Brochure
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};