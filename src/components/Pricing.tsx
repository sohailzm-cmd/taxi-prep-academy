
import React, { useEffect, useRef } from 'react';
import { CheckCircle, X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const Pricing: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });

    if (sectionRef.current) {
      const elements = sectionRef.current.querySelectorAll('.animate-on-scroll');
      elements.forEach(el => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  const plans = [
    {
      name: 'Standard-Kursplan',
      price: '499',
      description: 'Ideale Vorbereitung für angehende Taxi- und Mietwagenunternehmer.',
      features: [
        '34 Stunden On-Demand-Videos',
        'Lebenslanger Zugriff auf Kursinhalte',
        'Q&A-Sitzungen nach jedem Modul',
        'Zugriff auf Kursunterlagen',
        'Online-Selbsttests',
        'Zugriff auf Community-Forum',
      ],
      notIncluded: [
        'Persönliche Betreuung',
        'Individuelle Feedback-Sitzungen',
        'Lettering-Service',
        'Prüfungssimulation mit Feedback',
      ],
      popular: false,
      ctaText: 'Jetzt buchen',
    },
    {
      name: 'Full Lettering + Feedback',
      price: '999',
      description: 'Umfassende Betreuung mit persönlichem Feedback für maximalen Erfolg.',
      features: [
        '34 Stunden On-Demand-Videos',
        'Lebenslanger Zugriff auf Kursinhalte',
        'Q&A-Sitzungen nach jedem Modul',
        'Zugriff auf Kursunterlagen',
        'Online-Selbsttests',
        'Zugriff auf Community-Forum',
        'Persönliche Betreuung',
        'Individuelle Feedback-Sitzungen',
        'Lettering-Service',
        'Prüfungssimulation mit Feedback',
      ],
      notIncluded: [],
      popular: true,
      ctaText: 'Premium buchen',
    },
  ];

  return (
    <section ref={sectionRef} id="pricing" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          <h2 className="animate-on-scroll text-3xl md:text-4xl font-bold mb-4" style={{opacity: 0}}>
            Transparente Preisoptionen
          </h2>
          <p className="animate-on-scroll text-lg text-muted-foreground" style={{opacity: 0}}>
            Wählen Sie den Kursplan, der am besten zu Ihren Bedürfnissen passt. 
            Alle Optionen bieten eine erstklassige Vorbereitung auf Ihre Karriere.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className="animate-on-scroll"
              style={{ opacity: 0, animationDelay: `${index * 200}ms` }}
            >
              <Card className={cn(
                "h-full flex flex-col relative overflow-hidden transition-all duration-500",
                plan.popular ? "shadow-xl border-primary/20" : "shadow-md hover:shadow-lg"
              )}>
                {plan.popular && (
                  <div className="absolute top-0 right-0">
                    <div className="h-20 w-20 bg-primary text-white flex items-center justify-center rotate-45 translate-x-8 -translate-y-8">
                      <span className="text-xs font-medium -rotate-45 translate-y-6 translate-x-1">Empfohlen</span>
                    </div>
                  </div>
                )}
                
                <CardHeader className="pb-4">
                  {plan.popular && (
                    <Badge variant="outline" className="w-fit mb-2 border-primary text-primary">
                      Meistgewählt
                    </Badge>
                  )}
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">{plan.price} €</span>
                    <span className="text-muted-foreground ml-1">einmalig</span>
                  </div>
                  <p className="text-muted-foreground mt-2">{plan.description}</p>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mr-3 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                    
                    {plan.notIncluded.map((feature, i) => (
                      <li key={i} className="flex items-start text-muted-foreground/70">
                        <X className="h-5 w-5 flex-shrink-0 mr-3 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter className="pt-4">
                  <Button 
                    className={cn(
                      "w-full rounded-full justify-between group",
                      plan.popular 
                        ? "bg-primary hover:bg-primary/90 text-white shadow-md" 
                        : "bg-secondary hover:bg-secondary/80"
                    )}
                  >
                    <span>{plan.ctaText}</span>
                    <ChevronRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center animate-on-scroll glassmorphism p-6 rounded-xl max-w-3xl mx-auto" style={{opacity: 0}}>
          <h3 className="text-xl font-medium mb-2">Haben Sie noch Fragen zu unseren Preisen?</h3>
          <p className="text-muted-foreground mb-4">
            Unser Team steht Ihnen gerne zur Verfügung, um alle Ihre Fragen zu beantworten 
            und Ihnen bei der Auswahl des richtigen Kursplans zu helfen.
          </p>
          <Button variant="outline" className="rounded-full">
            Kontaktieren Sie uns
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
