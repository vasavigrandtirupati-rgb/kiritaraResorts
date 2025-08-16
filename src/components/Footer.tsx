import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram, Youtube, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteData } from '@/data/siteData.js';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const getSocialIcon = (icon: string) => {
    switch (icon) {
      case 'linkedin': return <Linkedin className="w-5 h-5" />;
      case 'twitter': return <Twitter className="w-5 h-5" />;
      case 'instagram': return <Instagram className="w-5 h-5" />;
      case 'youtube': return <Youtube className="w-5 h-5" />;
      default: return null;
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-card via-card to-muted/50 border-t border-border">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-gradient-gold p-3 rounded-xl luxury-shadow">
                <div className="w-8 h-8 bg-background rounded-lg flex items-center justify-center">
                  <span className="font-display font-bold text-primary text-xl">K</span>
                </div>
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-foreground">
                  {siteData.brand.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {siteData.brand.tagline}
                </p>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {siteData.footer.description}
            </p>

            {/* Social Links */}
            <div className="flex space-x-3">
              {siteData.footer.social.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="p-3 bg-muted/50 hover:bg-primary/10 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                  aria-label={social.name}
                >
                  <div className="text-muted-foreground group-hover:text-primary transition-colors duration-300">
                    {getSocialIcon(social.icon)}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h4 className="font-display font-semibold text-lg mb-6 text-foreground">
              Investment Options
            </h4>
            <ul className="space-y-3">
              {siteData.footer.quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 transform inline-block"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="lg:col-span-1">
            <h4 className="font-display font-semibold text-lg mb-6 text-foreground">
              Legal & Support
            </h4>
            <ul className="space-y-3">
              {siteData.footer.legalLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 transform inline-block"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-1">
            <h4 className="font-display font-semibold text-lg mb-6 text-foreground">
              Contact Information
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Phone</p>
                  <a 
                    href={`tel:${siteData.contact.phone}`}
                    className="text-foreground font-medium hover:text-primary transition-colors duration-300"
                  >
                    {siteData.contact.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <a 
                    href={`mailto:${siteData.contact.email}`}
                    className="text-foreground font-medium hover:text-primary transition-colors duration-300 break-all"
                  >
                    {siteData.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Office</p>
                  <p className="text-foreground font-medium">{siteData.contact.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-muted-foreground text-sm mb-4 md:mb-0">
              {siteData.footer.copyright}
            </p>
            
            <div className="flex items-center space-x-4">
              <p className="text-xs text-muted-foreground">
                Investment opportunities involve risk. Past performance does not guarantee future results.
              </p>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={scrollToTop}
                className="hover:bg-primary/10 transition-all duration-300 hover:scale-110"
              >
                <ArrowUp className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};