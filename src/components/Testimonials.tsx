
import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const testimonials = [
    {
      name: 'Thomas Schmidt',
      role: 'Taxiunternehmer seit 2022',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=100&h=100&auto=format&fit=crop',
      content: 'Der Kurs bei TUM-Academy hat mir enorm geholfen. Die Struktur ist klar und verständlich, und ich konnte alles sehr gut in die Praxis umsetzen. Ich habe die Prüfung beim ersten Mal bestanden und fühle mich gut auf meine Selbstständigkeit vorbereitet.',
      rating: 5,
    },
    {
      name: 'Marie Krüger',
      role: 'Mietwagenunternehmerin',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&h=100&auto=format&fit=crop',
      content: 'Was mich besonders beeindruckt hat, war die persönliche Betreuung. Trotz Online-Format hatte ich das Gefühl, dass meine individuellen Fragen und Bedürfnisse berücksichtigt wurden. Die Dozenten waren jederzeit ansprechbar und haben mir sehr geholfen.',
      rating: 5,
    },
    {
      name: 'Alexander Weber',
      role: 'Taxi- und Mietwagenunternehmer',
      image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&h=100&auto=format&fit=crop',
      content: 'Die betriebswirtschaftlichen Module waren für mich am wertvollsten. Ich hatte vorher kaum Erfahrung mit Buchhaltung und Finanzplanung, aber der Kurs hat diese Themen sehr praxisnah vermittelt. Ich kann TUM-Academy nur empfehlen!',
      rating: 4,
    },
    {
      name: 'Jessica Bauer',
      role: 'Angehende Taxiunternehmerin',
      image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=100&h=100&auto=format&fit=crop',
      content: 'Die Flexibilität des Online-Kurses kam mir sehr entgegen. Ich konnte neben meinem Beruf lernen und mir die Zeit frei einteilen. Die Q&A-Sitzungen haben mir geholfen, offene Fragen zu klären. Ein durchdachtes Konzept!',
      rating: 5,
    },
  ];
  
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

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-gradient-to-b from-transparent to-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          <h2 className="animate-on-scroll text-3xl md:text-4xl font-bold mb-4" style={{opacity: 0}}>
            Was unsere Teilnehmer sagen
          </h2>
          <p className="animate-on-scroll text-lg text-muted-foreground" style={{opacity: 0}}>
            Erfahren Sie, wie unsere Kurse Menschen dabei geholfen haben, erfolgreiche 
            Unternehmer in der Taxi- und Mietwagenbranche zu werden.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto animate-on-scroll" style={{opacity: 0}}>
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <Card className="p-8 h-full shadow-lg border-0 bg-background/70 backdrop-blur-sm">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center mb-6">
                        <div className="relative mr-4">
                          <div className="w-14 h-14 overflow-hidden rounded-full border-2 border-primary/20">
                            <img 
                              src={testimonial.image} 
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          <div className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 6 9 17l-5-5" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold">{testimonial.name}</h4>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                        <div className="ml-auto flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i}
                              className={cn(
                                "h-4 w-4", 
                                i < testimonial.rating ? "text-amber-500 fill-amber-500" : "text-gray-300"
                              )}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex-grow">
                        <blockquote className="italic text-foreground/80 leading-relaxed">
                          "{testimonial.content}"
                        </blockquote>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-colors",
                  index === activeIndex ? "bg-primary" : "bg-gray-300 hover:bg-gray-400"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          <div className="absolute top-1/2 left-0 right-0 flex justify-between items-center -translate-y-1/2 pointer-events-none px-4">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-background/80 backdrop-blur-sm shadow-md hover:bg-background pointer-events-auto"
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-background/80 backdrop-blur-sm shadow-md hover:bg-background pointer-events-auto"
              onClick={nextTestimonial}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
