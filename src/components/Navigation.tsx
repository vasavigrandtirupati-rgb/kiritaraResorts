import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, User, LogOut, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '@/hooks/useAuth';

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, signOut, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-background/80 backdrop-blur-md border-b border-border shadow-luxury' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-gold p-2 rounded-lg">
              <div className="w-8 h-8 bg-background rounded-md flex items-center justify-center">
                <span className="font-display font-bold text-primary text-lg">K</span>
              </div>
            </div>
            <div>
              <h1 className="font-display font-bold text-xl text-foreground">
                Kiritara Resorts
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Luxury Investment Opportunities
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {[
              { name: 'Home', href: '#hero', active: true },
              { name: 'Investments', href: '#investments', active: false },
              { name: 'Gallery', href: '#gallery', active: false },
              { name: 'About', href: '#about', active: false },
              { name: 'Contact', href: '#contact', active: false },
            ].map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={`relative px-4 py-2 font-medium transition-all duration-300 hover:text-primary ${
                  link.active ? 'text-primary' : 'text-foreground/80'
                } group`}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-gold transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground hidden md:block">
                  {user.email}
                </span>
                {isAdmin && (
                  <Link to="/admin">
                    <Button variant="secondary" size="sm" className="hidden md:flex">
                      <Settings className="w-4 h-4 mr-2" />
                      Admin
                    </Button>
                  </Link>
                )}
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={signOut}
                  className="hidden md:flex"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button className="btn-luxury hidden md:flex">
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </Link>
            )}
            
            <Button 
              className="btn-luxury hidden md:flex"
              onClick={() => scrollToSection('#contact')}
            >
              Get Started
            </Button>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        <div className={`lg:hidden transition-all duration-300 ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <div className="py-4 space-y-2 border-t border-border">
            {[
              { name: 'Home', href: '#hero', active: true },
              { name: 'Investments', href: '#investments', active: false },
              { name: 'Gallery', href: '#gallery', active: false },
              { name: 'About', href: '#about', active: false },
              { name: 'Contact', href: '#contact', active: false },
            ].map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={`block w-full text-left px-4 py-3 rounded-lg transition-all duration-300 hover:bg-primary/10 ${
                  link.active ? 'text-primary bg-primary/5' : 'text-foreground/80'
                }`}
              >
                {link.name}
              </button>
            ))}
            <div className="pt-4 border-t border-border space-y-2">
              {user ? (
                <>
                  <div className="px-4 py-2 text-sm text-muted-foreground">
                    {user.email}
                  </div>
                  {isAdmin && (
                    <Link to="/admin" className="block">
                      <Button variant="secondary" className="w-full mb-2">
                        <Settings className="w-4 h-4 mr-2" />
                        Admin Panel
                      </Button>
                    </Link>
                  )}
                  <Button 
                    variant="outline"
                    className="w-full"
                    onClick={signOut}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <Link to="/auth" className="block">
                  <Button className="btn-luxury w-full">
                    <User className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                </Link>
              )}
              <Button 
                className="btn-luxury w-full"
                onClick={() => scrollToSection('#contact')}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};