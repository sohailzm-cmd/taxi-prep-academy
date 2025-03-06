
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary py-16">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">TUM-Academy</h2>
            <p className="text-muted-foreground">
              Ihre Bildungsplattform für die optimale Vorbereitung 
              auf den Taxi- und Mietwagen-Unternehmer-Schein.
            </p>
            <div className="flex space-x-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full hover:bg-primary/10 hover:text-primary"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full hover:bg-primary/10 hover:text-primary"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full hover:bg-primary/10 hover:text-primary"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Schnelllinks</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/course" className="text-muted-foreground hover:text-primary transition-colors">
                  Kurs
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  Über Uns
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Rechtliches</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  AGB
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link to="/imprint" className="text-muted-foreground hover:text-primary transition-colors">
                  Impressum
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Kontakt</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-0.5 text-primary" />
                <span className="text-muted-foreground">
                  Beispielstraße 123<br />
                  10115 Berlin<br />
                  Deutschland
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-primary" />
                <a href="tel:+49301234567" className="text-muted-foreground hover:text-primary transition-colors">
                  +49 30 1234567
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-primary" />
                <a href="mailto:info@tum-academy.de" className="text-muted-foreground hover:text-primary transition-colors">
                  info@tum-academy.de
                </a>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            &copy; {currentYear} TUM-Academy. Alle Rechte vorbehalten.
          </div>
          <div className="text-sm text-muted-foreground">
            Designed with ♥ in Berlin
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
