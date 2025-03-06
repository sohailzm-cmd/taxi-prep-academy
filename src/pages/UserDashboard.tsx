
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Book, CheckCircle, Clock, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Temporary mock data
const userCoursesData = [
  {
    id: '1',
    title: 'Taxi- und Mietwagenunternehmer-Schein',
    description: 'Umfassender Kurs zur Vorbereitung auf die Prüfung zum Taxi- und Mietwagenunternehmer.',
    enrolled: '15.05.2023',
    progress: 35,
    modules: [
      { id: 'm1', title: 'Einführung in die Taxi- und Mietwagenbranche', completed: true },
      { id: 'm2', title: 'Gesetzliche Grundlagen', completed: false },
      { id: 'm3', title: 'Betriebswirtschaftliche Kenntnisse', completed: false },
      { id: 'm4', title: 'Marketingstrategien', completed: false },
    ],
    nextLesson: {
      module: 'Gesetzliche Grundlagen',
      title: 'Pflichten als Unternehmer',
      duration: '60 Min'
    }
  }
];

const recentActivitiesData = [
  { id: 1, type: 'lesson', title: 'Rechtlicher Rahmen', module: 'Gesetzliche Grundlagen', date: '2023-10-15T14:30:00Z' },
  { id: 2, type: 'module', title: 'Einführung in die Taxi- und Mietwagenbranche', date: '2023-10-10T09:45:00Z' },
  { id: 3, type: 'enrollment', title: 'Taxi- und Mietwagenunternehmer-Schein', date: '2023-05-15T11:20:00Z' },
];

const UserDashboard = ({ auth }) => {
  const [userCourses, setUserCourses] = useState(userCoursesData);
  const [recentActivities, setRecentActivities] = useState(recentActivitiesData);
  
  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('de-DE', options);
  };
  
  // Format relative time (e.g., "2 days ago")
  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
      if (diffInHours === 0) {
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        return `vor ${diffInMinutes} Minuten`;
      }
      return `vor ${diffInHours} Stunden`;
    } else if (diffInDays === 1) {
      return 'gestern';
    } else if (diffInDays < 7) {
      return `vor ${diffInDays} Tagen`;
    } else {
      return formatDate(dateString);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container px-4 py-8 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Willkommen zurück, {auth.user?.name || 'Nutzer'}!</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button asChild>
                <Link to="/catalog">
                  <Book className="mr-2 h-4 w-4" />
                  Kursangebot durchsuchen
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main content - 2/3 width on large screens */}
            <div className="lg:col-span-2 space-y-6">
              {/* Enrolled Courses */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Meine Kurse</h2>
                
                {userCourses.length > 0 ? (
                  <div className="space-y-4">
                    {userCourses.map(course => (
                      <Card key={course.id} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-xl">{course.title}</CardTitle>
                          <CardDescription>{course.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="mb-4">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Fortschritt: {course.progress}%</span>
                              <span className="text-muted-foreground">Eingeschrieben: {course.enrolled}</span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                          </div>
                          
                          <h4 className="font-medium text-sm mb-2">Module:</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                            {course.modules.map(module => (
                              <div 
                                key={module.id} 
                                className={`flex items-center p-2 rounded-md ${
                                  module.completed 
                                    ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300' 
                                    : 'bg-secondary'
                                }`}
                              >
                                {module.completed ? (
                                  <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                                ) : (
                                  <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                                )}
                                <span className="text-sm truncate">{module.title}</span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="bg-secondary/50 rounded-md p-3">
                            <h4 className="font-medium text-sm mb-2">Nächste Lektion:</h4>
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">{course.nextLesson.title}</p>
                                <p className="text-sm text-muted-foreground">
                                  {course.nextLesson.module} • {course.nextLesson.duration}
                                </p>
                              </div>
                              <Button asChild size="sm">
                                <Link to={`/course/${course.id}`}>
                                  Fortfahren
                                  <ExternalLink className="ml-1 h-3 w-3" />
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button asChild variant="outline" className="w-full">
                            <Link to={`/course/${course.id}`}>
                              Zum Kurs
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-10">
                      <Book className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">Sie haben noch keine Kurse</h3>
                      <p className="text-muted-foreground text-center mb-4">
                        Entdecken Sie unser Kursangebot und starten Sie Ihre Lernreise.
                      </p>
                      <Button asChild>
                        <Link to="/catalog">Kurse durchsuchen</Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
            
            {/* Sidebar - 1/3 width on large screens */}
            <div className="space-y-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Letzte Aktivitäten</CardTitle>
                </CardHeader>
                <CardContent>
                  {recentActivities.length > 0 ? (
                    <div className="space-y-4">
                      {recentActivities.map((activity, index) => (
                        <div key={activity.id}>
                          <div className="flex justify-between">
                            <div>
                              <p className="font-medium">{activity.title}</p>
                              {activity.module && (
                                <p className="text-sm text-muted-foreground">{activity.module}</p>
                              )}
                              <p className="text-xs text-muted-foreground">
                                {formatRelativeTime(activity.date)}
                              </p>
                            </div>
                            <div className="text-sm">
                              {activity.type === 'lesson' && (
                                <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 px-2 py-1 rounded-full text-xs">
                                  Lektion
                                </span>
                              )}
                              {activity.type === 'module' && (
                                <span className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300 px-2 py-1 rounded-full text-xs">
                                  Modul
                                </span>
                              )}
                              {activity.type === 'enrollment' && (
                                <span className="bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300 px-2 py-1 rounded-full text-xs">
                                  Einschreibung
                                </span>
                              )}
                            </div>
                          </div>
                          {index < recentActivities.length - 1 && (
                            <Separator className="my-3" />
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-4">
                      Keine Aktivitäten gefunden
                    </p>
                  )}
                </CardContent>
              </Card>
              
              {/* Account Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Mein Account</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name:</span>
                      <span className="font-medium">{auth.user?.name || 'Unbekannt'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">E-Mail:</span>
                      <span className="font-medium">{auth.user?.email || 'Unbekannt'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Mitglied seit:</span>
                      <span className="font-medium">Mai 2023</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Abonnement:</span>
                      <span className="font-medium">Standard-Kursplan</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    Account verwalten
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UserDashboard;
