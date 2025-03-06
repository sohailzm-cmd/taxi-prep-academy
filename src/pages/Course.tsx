
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Check, Lock, PlayCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Temporary mock data - will be replaced with actual data from backend
const courseMock = {
  id: '1',
  title: 'Taxi- und Mietwagenunternehmer-Schein',
  description: 'Umfassender Kurs zur Vorbereitung auf die Prüfung zum Taxi- und Mietwagenunternehmer.',
  modules: [
    {
      id: 'm1',
      title: 'Einführung in die Taxi- und Mietwagenbranche',
      description: 'Marktanalyse, aktuelle Trends und grundlegende Brancheninformationen.',
      duration: '4 Stunden',
      completed: true,
      locked: false,
      lessons: [
        { id: 'l1', title: 'Überblick über die Branche', duration: '45 Min', completed: true },
        { id: 'l2', title: 'Aktuelle Markttrends', duration: '60 Min', completed: true },
        { id: 'l3', title: 'Zukunftsaussichten', duration: '45 Min', completed: true },
      ]
    },
    {
      id: 'm2',
      title: 'Gesetzliche Grundlagen',
      description: 'Rechte & Pflichten eines Unternehmers, Verkehrsvorschriften und Arbeitsrecht.',
      duration: '8 Stunden',
      completed: false,
      locked: false,
      lessons: [
        { id: 'l4', title: 'Rechtlicher Rahmen', duration: '90 Min', completed: true },
        { id: 'l5', title: 'Pflichten als Unternehmer', duration: '60 Min', completed: false },
        { id: 'l6', title: 'Arbeitsrecht Grundlagen', duration: '75 Min', completed: false },
      ]
    },
    {
      id: 'm3',
      title: 'Betriebswirtschaftliche Kenntnisse',
      description: 'Unternehmensplanung, Finanzmanagement, Buchhaltung & Steuerrecht.',
      duration: '12 Stunden',
      completed: false,
      locked: true,
      lessons: [
        { id: 'l7', title: 'Geschäftsplanung', duration: '90 Min', completed: false },
        { id: 'l8', title: 'Buchhaltung Grundlagen', duration: '120 Min', completed: false },
        { id: 'l9', title: 'Steuerrecht für Taxi-Unternehmer', duration: '90 Min', completed: false },
      ]
    },
    {
      id: 'm4',
      title: 'Marketingstrategien',
      description: 'Kundengewinnung, Kundenbindung und effektives Marketing für Ihr Unternehmen.',
      duration: '10 Stunden',
      completed: false,
      locked: true,
      lessons: [
        { id: 'l10', title: 'Grundlagen des Marketings', duration: '60 Min', completed: false },
        { id: 'l11', title: 'Kundenakquise', duration: '90 Min', completed: false },
        { id: 'l12', title: 'Online Marketing', duration: '120 Min', completed: false },
      ]
    }
  ]
};

const Course: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState(courseMock);
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [overallProgress, setOverallProgress] = useState(0);
  
  useEffect(() => {
    // In a real app, this would fetch the course data from an API
    // For now we're using mock data
    
    // Set the first unlocked module as active by default
    const firstUnlockedModule = course.modules.find(m => !m.locked);
    if (firstUnlockedModule) {
      setActiveModule(firstUnlockedModule.id);
    }
    
    // Calculate overall progress
    const totalLessons = course.modules.flatMap(m => m.lessons).length;
    const completedLessons = course.modules.flatMap(m => m.lessons).filter(l => l.completed).length;
    setOverallProgress(Math.round((completedLessons / totalLessons) * 100));
  }, [course]);

  const handleModuleClick = (moduleId: string) => {
    const module = course.modules.find(m => m.id === moduleId);
    if (module && !module.locked) {
      setActiveModule(moduleId);
    }
  };

  const handleLessonComplete = (moduleId: string, lessonId: string) => {
    // Update the course state to mark the lesson as completed
    const updatedCourse = { ...course };
    const moduleIndex = updatedCourse.modules.findIndex(m => m.id === moduleId);
    
    if (moduleIndex !== -1) {
      const lessonIndex = updatedCourse.modules[moduleIndex].lessons.findIndex(l => l.id === lessonId);
      if (lessonIndex !== -1) {
        updatedCourse.modules[moduleIndex].lessons[lessonIndex].completed = true;
        
        // Check if all lessons in the module are completed
        const allLessonsCompleted = updatedCourse.modules[moduleIndex].lessons.every(l => l.completed);
        if (allLessonsCompleted) {
          updatedCourse.modules[moduleIndex].completed = true;
          
          // Unlock the next module if there is one
          if (moduleIndex < updatedCourse.modules.length - 1) {
            updatedCourse.modules[moduleIndex + 1].locked = false;
          }
        }
        
        setCourse(updatedCourse);
        
        // Recalculate overall progress
        const totalLessons = updatedCourse.modules.flatMap(m => m.lessons).length;
        const completedLessons = updatedCourse.modules.flatMap(m => m.lessons).filter(l => l.completed).length;
        setOverallProgress(Math.round((completedLessons / totalLessons) * 100));
      }
    }
  };

  // Find the active module object
  const currentModule = course.modules.find(m => m.id === activeModule);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container px-4 py-8 mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
            <p className="text-muted-foreground mb-4">{course.description}</p>
            
            <div className="mb-4">
              <p className="text-sm font-medium mb-2">Gesamtfortschritt</p>
              <Progress value={overallProgress} className="h-2 w-full" />
              <p className="text-sm text-muted-foreground mt-1">{overallProgress}% abgeschlossen</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Module List */}
            <div className="lg:col-span-1">
              <h2 className="text-xl font-semibold mb-4">Module</h2>
              <div className="space-y-3">
                {course.modules.map((module) => (
                  <Card 
                    key={module.id}
                    className={`cursor-pointer transition-all ${
                      module.locked 
                        ? 'opacity-70 bg-secondary/50' 
                        : module.id === activeModule 
                          ? 'border-primary shadow-md' 
                          : 'hover:border-primary/50'
                    }`}
                    onClick={() => handleModuleClick(module.id)}
                  >
                    <CardHeader className="p-4">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base">{module.title}</CardTitle>
                        {module.locked ? (
                          <Lock className="h-5 w-5 text-muted-foreground" />
                        ) : module.completed ? (
                          <Check className="h-5 w-5 text-green-500" />
                        ) : null}
                      </div>
                      <CardDescription className="line-clamp-2 text-xs">
                        {module.description}
                      </CardDescription>
                      <div className="text-xs text-muted-foreground mt-2">
                        Dauer: {module.duration}
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Module Content */}
            <div className="lg:col-span-3">
              {currentModule ? (
                <div>
                  <h2 className="text-2xl font-bold mb-4">{currentModule.title}</h2>
                  <p className="text-muted-foreground mb-6">{currentModule.description}</p>
                  
                  <h3 className="text-lg font-semibold mb-4">Lektionen</h3>
                  <div className="space-y-4">
                    {currentModule.lessons.map((lesson, index) => (
                      <Card key={lesson.id} className="overflow-hidden">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-4">
                              <PlayCircle className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-medium">{index + 1}. {lesson.title}</h4>
                              <p className="text-sm text-muted-foreground">Dauer: {lesson.duration}</p>
                            </div>
                          </div>
                          <div className="ml-14 sm:ml-0 mt-3 sm:mt-0">
                            {lesson.completed ? (
                              <div className="flex items-center text-green-500">
                                <Check className="h-5 w-5 mr-1" />
                                <span className="text-sm font-medium">Abgeschlossen</span>
                              </div>
                            ) : (
                              <Button 
                                size="sm" 
                                onClick={() => handleLessonComplete(currentModule.id, lesson.id)}
                              >
                                Als abgeschlossen markieren
                              </Button>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 bg-secondary/30 rounded-lg">
                  <p className="text-muted-foreground">Bitte wählen Sie ein Modul aus, um zu beginnen</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Course;
