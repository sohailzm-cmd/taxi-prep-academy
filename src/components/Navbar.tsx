
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'py-3 glassmorphism shadow-sm' 
          : 'py-5 bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="text-xl md:text-2xl font-display font-bold tracking-tight hover:opacity-90 transition-opacity"
          >
            TUM-Academy
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link to="/" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/course" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors">
              Kurs
            </Link>
            <div className="relative group">
              <button className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors flex items-center">
                Über Uns
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-900 ring-1 ring-black ring-opacity-5 invisible group-hover:visible transition-all opacity-0 group-hover:opacity-100 glassmorphism">
                <Link to="/about" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  Über TUM-Academy
                </Link>
                <Link to="/team" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  Unser Team
                </Link>
              </div>
            </div>
            <Link to="/contact" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors">
              Kontakt
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="text-sm rounded-full px-6">
              Anmelden
            </Button>
            <Button className="text-sm rounded-full px-6 bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-all">
              Kurs buchen
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex items-center p-2"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          'md:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-opacity',
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
      >
        <div className={cn(
          'fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-background shadow-xl transition-transform duration-300 ease-in-out',
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}>
          <div className="flex flex-col h-full py-6 px-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-8 px-4">
              <Link 
                to="/" 
                className="text-xl font-display font-bold"
                onClick={() => setIsMenuOpen(false)}
              >
                TUM-Academy
              </Link>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-2"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col space-y-1 px-4">
              <Link 
                to="/"
                className="py-3 text-base font-medium hover:text-primary border-b border-gray-100 dark:border-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/course"
                className="py-3 text-base font-medium hover:text-primary border-b border-gray-100 dark:border-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Kurs
              </Link>
              <Link 
                to="/about"
                className="py-3 text-base font-medium hover:text-primary border-b border-gray-100 dark:border-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Über Uns
              </Link>
              <Link 
                to="/contact"
                className="py-3 text-base font-medium hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Kontakt
              </Link>
            </nav>
            <div className="mt-auto px-4 pt-6">
              <div className="grid gap-3">
                <Button variant="outline" className="w-full rounded-full">
                  Anmelden
                </Button>
                <Button className="w-full rounded-full bg-primary hover:bg-primary/90 text-white">
                  Kurs buchen
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
