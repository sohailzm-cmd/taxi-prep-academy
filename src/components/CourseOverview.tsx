
import React, { useEffect, useRef } from 'react';
import { Book, BookText, BarChart, ScrollText, User, Calendar, Clock, Award } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const CourseOverview: React.FC = () => {
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

  const modules = [
    {
      icon: <Book className="h-6 w-6" />,
      title: 'Einführung in die Taxi- und Mietwagenbranche',
      description: 'Marktanalyse, aktuelle Trends und grundlegende Brancheninformationen.',
      color: 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300',
    },
    {
      icon: <ScrollText className="h-6 w-6" />,
      title: 'Gesetzliche Grundlagen',
      description: 'Rechte & Pflichten eines Unternehmers, Verkehrsvorschriften und Arbeitsrecht.',
      color: 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300',
    },
    {
      icon: <BarChart className="h-6 w-6" />,
      title: 'Betriebswirtschaftliche Kenntnisse',
      description: 'Unternehmensplanung, Finanzmanagement, Buchhaltung & Steuerrecht.',
      color: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300',
    },
    {
      icon: <BookText className="h-6 w-6" />,
      title: 'Marketingstrategien',
      description: 'Kundengewinnung, Kundenbindung und effektives Marketing für Ihr Unternehmen.',
      color: 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300',
    },
  ];

  const features = [
    {
      icon: <Clock className="h-5 w-5" />,
      title: '34 Stunden Videos',
      description: 'Umfangreiche On-Demand-Videoinhalte'
    },
    {
      icon: <User className="h-5 w-5" />,
      title: 'Q&A-Sitzungen',
      description: 'Nach jedem Modul für offene Fragen'
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      title: 'Lebenslanger Zugriff',
      description: 'Auf alle Kursinhalte und Updates'
    },
    {
      icon: <Award className="h-5 w-5" />,
      title: 'Zertifizierung',
      description: 'Nach erfolgreichem Abschluss'
    },
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          <h2 className="animate-on-scroll text-3xl md:text-4xl font-bold mb-4" style={{opacity: 0}}>
            Umfassender Kursinhalt für Ihren Erfolg
          </h2>
          <p className="animate-on-scroll text-lg text-muted-foreground" style={{opacity: 0}}>
            Unser strukturierter Kurs vermittelt Ihnen alle notwendigen Kenntnisse und Fähigkeiten
            für eine erfolgreiche Karriere als Taxi- oder Mietwagenunternehmer.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {modules.map((module, index) => (
            <div
              key={index}
              className="animate-on-scroll"
              style={{ opacity: 0, animationDelay: `${index * 100}ms` }}
            >
              <Card className="h-full p-6 hover:shadow-lg transition-shadow border border-border/50 overflow-hidden group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center mb-4", 
                  module.color
                )}>
                  {module.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                  {module.title}
                </h3>
                <p className="text-muted-foreground">
                  {module.description}
                </p>
              </Card>
            </div>
          ))}
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-3xl transform -rotate-1"></div>
          <div className="relative glassmorphism rounded-2xl p-8 shadow-lg border border-white/20 dark:border-gray-800/20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h3 className="animate-on-scroll text-2xl font-bold" style={{opacity: 0}}>
                  Was Sie in unserem Kurs erwartet
                </h3>
                <p className="animate-on-scroll text-muted-foreground" style={{opacity: 0}}>
                  Unsere Lernmaterialien sind praxisorientiert und auf die Anforderungen der 
                  Prüfung sowie die Herausforderungen im Unternehmensalltag zugeschnitten.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <div 
                      key={index} 
                      className="animate-on-scroll flex items-start"
                      style={{opacity: 0, animationDelay: `${index * 100}ms`}}
                    >
                      <div className="mr-3 h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                        {feature.icon}
                      </div>
                      <div>
                        <p className="font-medium">{feature.title}</p>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="animate-on-scroll hidden md:block" style={{opacity: 0}}>
                <div className="relative overflow-hidden rounded-xl shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                    alt="Kursmaterialien"
                    className="w-full h-80 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end p-6">
                    <span className="text-white font-medium">Unsere moderne Lernplattform</span>
                    <span className="text-white/80 text-sm">Lernen Sie jederzeit und überall</span>
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

export default CourseOverview;
