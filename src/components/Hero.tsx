
import React, { useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1
    });

    if (heroRef.current) {
      const elements = heroRef.current.querySelectorAll('.animate-on-scroll');
      elements.forEach(el => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  const benefits = [
    'Umfassende Vorbereitung für die Selbstständigkeit',
    'Rechtliches & Betriebswirtschaftliches Wissen',
    'Lebenslanger Zugriff auf Kursmaterialien',
    'Persönliches Feedback von Experten'
  ];

  return (
    <section ref={heroRef} className="pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-6 items-center">
          <div className="space-y-8 max-w-2xl">
            <div className="space-y-4">
              <div 
                className="animate-on-scroll inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium bg-secondary/50"
                style={{opacity: 0}}
              >
                <span className="text-primary font-semibold">Neu</span>
                <span className="ml-2 text-foreground/80">Nächster Kursstart: 15. September</span>
              </div>
              
              <h1 
                className="animate-on-scroll text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
                style={{opacity: 0}}
              >
                Ihre perfekte Vorbereitung zum{" "}
                <span className="text-primary inline-block">Taxi-Unternehmer</span>
              </h1>
              
              <p 
                className="animate-on-scroll text-lg md:text-xl text-muted-foreground md:leading-8"
                style={{opacity: 0}}
              >
                Die TUM-Academy bietet Ihnen einen umfassenden Online-Kurs, der Sie optimal auf Ihre 
                Selbstständigkeit als Taxi- oder Mietwagenunternehmer vorbereitet.
              </p>
            </div>

            <div 
              className="animate-on-scroll grid gap-4"
              style={{opacity: 0}}
            >
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle2 className="mr-3 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <div 
              className="animate-on-scroll flex flex-col sm:flex-row gap-4"
              style={{opacity: 0}}
            >
              <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all">
                Jetzt anmelden
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full shadow hover:shadow-md">
                Mehr erfahren
              </Button>
            </div>

            <div 
              className="animate-on-scroll flex items-center text-sm text-muted-foreground"
              style={{opacity: 0}}
            >
              <div className="flex -space-x-2 mr-3">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "h-8 w-8 rounded-full border-2 border-background",
                      i % 2 === 0 ? "bg-gray-300" : "bg-gray-400"
                    )}
                  />
                ))}
              </div>
              <span>Über 500 erfolgreiche Absolventen</span>
            </div>
          </div>

          <div 
            className="animate-on-scroll hidden lg:flex justify-end"
            style={{opacity: 0}}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary/10 rounded-3xl transform rotate-3 scale-105 animate-pulse-slow"></div>
              <div className="relative overflow-hidden rounded-2xl shadow-2xl animate-float">
                <img 
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6" 
                  alt="Taxi-Unternehmer Kurs"
                  className="object-cover h-[500px] w-[600px]"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 glassmorphism p-4 rounded-xl shadow-lg animate-float" style={{animationDelay: '1s'}}>
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">34 Stunden</p>
                    <p className="text-xs text-muted-foreground">Video-Kursmaterial</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 glassmorphism p-4 rounded-xl shadow-lg animate-float" style={{animationDelay: '1.5s'}}>
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">99% Erfolgsquote</p>
                    <p className="text-xs text-muted-foreground">Bei der Prüfung</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
