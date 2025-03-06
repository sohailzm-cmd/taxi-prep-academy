
import React, { useEffect } from 'react';
import Hero from '@/components/Hero';
import CourseOverview from '@/components/CourseOverview';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index: React.FC = () => {
  // Smooth scroll for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      
      if (anchor) {
        e.preventDefault();
        const targetId = anchor.getAttribute('href')?.slice(1);
        if (targetId) {
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />

        {/* Scroll Down Indicator */}
        <div className="flex justify-center -mt-8 mb-12">
          <a
            href="#overview"
            className="flex flex-col items-center text-sm text-muted-foreground hover:text-primary transition-colors animate-bounce"
            aria-label="Scroll down"
          >
            <span className="mb-2">Mehr entdecken</span>
            <ChevronDown className="h-5 w-5" />
          </a>
        </div>

        {/* Course Overview Section */}
        <div id="overview">
          <CourseOverview />
        </div>

        {/* Pricing Section */}
        <Pricing />

        {/* CTA Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 -skew-y-3 transform-gpu"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="max-w-3xl mx-auto glassmorphism rounded-2xl p-8 md:p-12 shadow-xl border border-white/20 dark:border-gray-800/20 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-blur-in">
                Bereit für Ihren Karrierestart?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 animate-blur-in animation-delay-200">
                Melden Sie sich jetzt an und starten Sie Ihre Reise zum erfolgreichen 
                Taxi- oder Mietwagenunternehmer mit TUM-Academy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-blur-in animation-delay-400">
                <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all">
                  Kurs jetzt starten
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="rounded-full">
                  Beratungsgespräch vereinbaren
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <Testimonials />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
