
import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  ClipboardList, 
  Code, 
  FileText, 
  MessageSquare, 
  PlayCircle, 
  CheckCircle,
  ChevronRight,
  Clock,
  Calendar,
  BarChart,
  ArrowRight
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const CourseDetails: React.FC = () => {
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
      title: 'Modul 1: Einführung in die Taxi- und Mietwagenbranche',
      lessons: [
        { title: 'Überblick über die Branche', duration: '45 Min' },
        { title: 'Aktuelle Marktentwicklungen', duration: '60 Min' },
        { title: 'Zukunftstrends und Herausforderungen', duration: '50 Min' },
        { title: 'Chancen und Risiken der Selbstständigkeit', duration: '55 Min' },
      ],
      icon: <BookOpen className="h-6 w-6" />,
    },
    {
      title: 'Modul 2: Gesetzliche Grundlagen',
      lessons: [
        { title: 'Rechtliche Rahmenbedingungen', duration: '75 Min' },
        { title: 'Personenbeförderungsgesetz', duration: '90 Min' },
        { title: 'Rechte und Pflichten als Unternehmer', duration: '60 Min' },
        { title: 'Arbeitsrecht für Taxiunternehmer', duration: '70 Min' },
        { title: 'Verkehrsvorschriften und Besonderheiten', duration: '65 Min' },
      ],
      icon: <FileText className="h-6 w-6" />,
    },
    {
      title: 'Modul 3: Betriebswirtschaftliche Kenntnisse',
      lessons: [
        { title: 'Grundlagen der Unternehmensplanung', duration: '60 Min' },
        { title: 'Finanzplanung und Liquiditätsmanagement', duration: '80 Min' },
        { title: 'Buchhaltung für Unternehmer', duration: '90 Min' },
        { title: 'Steuerrecht für Taxiunternehmer', duration: '85 Min' },
        { title: 'Kostenrechnung und Preiskalkulation', duration: '75 Min' },
      ],
      icon: <BarChart className="h-6 w-6" />,
    },
    {
      title: 'Modul 4: Marketingstrategien',
      lessons: [
        { title: 'Grundlagen des Marketings', duration: '50 Min' },
        { title: 'Kundengewinnung und -bindung', duration: '65 Min' },
        { title: 'Digitales Marketing für Taxiunternehmen', duration: '70 Min' },
        { title: 'Service und Qualitätsmanagement', duration: '60 Min' },
      ],
      icon: <ClipboardList className="h-6 w-6" />,
    },
    {
      title: 'Modul 5: Praxisnahe Anwendung',
      lessons: [
        { title: 'Fallstudien', duration: '90 Min' },
        { title: 'Praxisbeispiele erfolgreicher Unternehmer', duration: '70 Min' },
        { title: 'Simulation betrieblicher Entscheidungen', duration: '85 Min' },
        { title: 'Prüfungsvorbereitung', duration: '120 Min' },
      ],
      icon: <Code className="h-6 w-6" />,
    },
  ];

  const faqItems = [
    {
      question: 'Wie lange habe ich Zugriff auf den Kurs?',
      answer: 'Sie erhalten einen lebenslangen Zugriff auf alle Kursinhalte. Das bedeutet, dass Sie auch nach Abschluss des Kurses jederzeit auf alle Materialien zugreifen können, um Ihr Wissen aufzufrischen oder bestimmte Themen nachzuschlagen.',
    },
    {
      question: 'Benötige ich Vorkenntnisse für den Kurs?',
      answer: 'Nein, Sie benötigen keine spezifischen Vorkenntnisse. Unser Kurs ist so aufgebaut, dass alle wichtigen Themen von Grund auf erklärt werden. Grundlegende PC-Kenntnisse sind allerdings von Vorteil, da der Kurs online stattfindet.',
    },
    {
      question: 'Wie läuft die Prüfung ab?',
      answer: 'Die offizielle Prüfung wird nicht von uns, sondern von der zuständigen IHK abgenommen. Unser Kurs bereitet Sie optimal auf diese Prüfung vor. Wir bieten auch Prüfungssimulationen an, damit Sie sich mit dem Format vertraut machen können.',
    },
    {
      question: 'Kann ich den Kurs auch unterbrechen und später fortsetzen?',
      answer: 'Ja, der Kurs ist flexibel gestaltet. Sie können jederzeit pausieren und zu einem späteren Zeitpunkt wieder einsteigen. Ihr Fortschritt wird gespeichert, sodass Sie genau dort weitermachen können, wo Sie aufgehört haben.',
    },
    {
      question: 'Was ist der Unterschied zwischen den beiden Kursoptionen?',
      answer: 'Der Standard-Kurs umfasst alle Video-Lektionen, Kursmaterialien und Q&A-Sitzungen. Die Premium-Option "Full Lettering + Feedback" bietet zusätzlich persönliche Betreuung, individuelle Feedback-Sitzungen und einen Lettering-Service für offizielle Dokumente.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Header */}
        <section className="py-12 md:py-20 bg-secondary/50">
          <div className="container px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  Online-Kurs
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                  Taxi- und Mietwagen-Unternehmer Kurs
                </h1>
                <p className="text-xl text-muted-foreground">
                  Umfassende Vorbereitung auf Ihre Selbstständigkeit in der Taxi- und Mietwagenbranche.
                </p>
                
                <div className="flex flex-wrap gap-6 mt-4">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-primary mr-2" />
                    <span>34 Stunden Videoinhalte</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-primary mr-2" />
                    <span>Lebenslanger Zugriff</span>
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="h-5 w-5 text-primary mr-2" />
                    <span>Q&A-Sitzungen</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-white">
                    Jetzt anmelden
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-full">
                    Kostenlose Beratung
                  </Button>
                </div>
              </div>
              
              <div className="relative hidden lg:block">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary/10 rounded-3xl transform rotate-3 scale-105 animate-pulse-slow"></div>
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                    alt="Taxi-Unternehmer Kurs"
                    className="object-cover h-[400px] w-full"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Course Content Tabs */}
        <section ref={sectionRef} className="py-16">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="curriculum" className="space-y-8">
              <TabsList className="w-full flex justify-start overflow-x-auto pb-2 space-x-2">
                <TabsTrigger value="curriculum" className="rounded-full">
                  Kursinhalt
                </TabsTrigger>
                <TabsTrigger value="features" className="rounded-full">
                  Features
                </TabsTrigger>
                <TabsTrigger value="faq" className="rounded-full">
                  FAQ
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="curriculum" className="space-y-8">
                <div className="space-y-6">
                  <h2 className="animate-on-scroll text-3xl font-bold" style={{opacity: 0}}>
                    Kursinhalt
                  </h2>
                  <p className="animate-on-scroll text-lg text-muted-foreground" style={{opacity: 0}}>
                    Unser umfassender Kurs ist in mehrere Module aufgeteilt, die Sie optimal auf 
                    Ihre Selbstständigkeit und die Unternehmerprüfung vorbereiten.
                  </p>
                </div>

                <div className="space-y-6">
                  {modules.map((module, index) => (
                    <div 
                      key={index}
                      className="animate-on-scroll"
                      style={{ opacity: 0, animationDelay: `${index * 100}ms` }}
                    >
                      <Card className="overflow-hidden">
                        <div className="p-6 bg-secondary/50">
                          <div className="flex items-start md:items-center">
                            <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-4 flex-shrink-0">
                              {module.icon}
                            </div>
                            <h3 className="text-xl font-semibold">{module.title}</h3>
                          </div>
                        </div>
                        <Separator />
                        <div className="p-6 space-y-4">
                          {module.lessons.map((lesson, lessonIndex) => (
                            <div key={lessonIndex} className="flex items-center justify-between">
                              <div className="flex items-center">
                                <PlayCircle className="h-5 w-5 text-primary mr-3" />
                                <span>{lesson.title}</span>
                              </div>
                              <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                            </div>
                          ))}
                        </div>
                      </Card>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="features" className="space-y-8">
                <div className="space-y-6">
                  <h2 className="animate-on-scroll text-3xl font-bold" style={{opacity: 0}}>
                    Kursfeatures
                  </h2>
                  <p className="animate-on-scroll text-lg text-muted-foreground" style={{opacity: 0}}>
                    Unser Kurs bietet zahlreiche Features, die Ihr Lernerlebnis optimieren und 
                    Ihnen helfen, sich optimal auf Ihre Selbstständigkeit vorzubereiten.
                  </p>
                </div>

                <div className="animate-on-scroll grid md:grid-cols-2 gap-6" style={{opacity: 0}}>
                  <Card className="p-6">
                    <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                      <PlayCircle className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">34 Stunden Video</h3>
                    <p className="text-muted-foreground">
                      Umfangreiche Video-Lektionen, die alle relevanten Themen abdecken und 
                      von erfahrenen Dozenten präsentiert werden.
                    </p>
                  </Card>
                  
                  <Card className="p-6">
                    <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                      <MessageSquare className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Q&A-Sitzungen</h3>
                    <p className="text-muted-foreground">
                      Regelmäßige Live-Sessions, in denen Sie Fragen stellen und 
                      direkt mit den Dozenten interagieren können.
                    </p>
                  </Card>
                  
                  <Card className="p-6">
                    <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                      <FileText className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Umfangreiche Materialien</h3>
                    <p className="text-muted-foreground">
                      Zugriff auf Skripte, Checklisten, Vorlagen und weitere Lernunterlagen, 
                      die Ihnen als Referenz dienen.
                    </p>
                  </Card>
                  
                  <Card className="p-6">
                    <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                      <Clock className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Flexibles Lernen</h3>
                    <p className="text-muted-foreground">
                      Lernen Sie in Ihrem eigenen Tempo und zu Zeiten, die für Sie am besten passen. 
                      Der Kurs ist vollständig on-demand verfügbar.
                    </p>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="faq" className="space-y-8">
                <div className="space-y-6">
                  <h2 className="animate-on-scroll text-3xl font-bold" style={{opacity: 0}}>
                    Häufig gestellte Fragen
                  </h2>
                  <p className="animate-on-scroll text-lg text-muted-foreground" style={{opacity: 0}}>
                    Hier finden Sie Antworten auf die häufigsten Fragen zu unserem Kurs und zur 
                    Unternehmerprüfung.
                  </p>
                </div>

                <div className="space-y-4">
                  {faqItems.map((item, index) => (
                    <div 
                      key={index}
                      className="animate-on-scroll"
                      style={{ opacity: 0, animationDelay: `${index * 100}ms` }}
                    >
                      <Card>
                        <div className="p-6">
                          <div className="flex justify-between items-start">
                            <h3 className="text-lg font-medium">{item.question}</h3>
                          </div>
                          <Separator className="my-4" />
                          <p className="text-muted-foreground">{item.answer}</p>
                        </div>
                      </Card>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Starten Sie Ihre Karriere als Unternehmer
              </h2>
              <p className="text-lg text-muted-foreground">
                Melden Sie sich jetzt an und beginnen Sie Ihre Reise zum erfolgreichen 
                Taxi- oder Mietwagenunternehmer.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-white">
                  Jetzt zum Kurs anmelden
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="rounded-full">
                  Weitere Informationen
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CourseDetails;
