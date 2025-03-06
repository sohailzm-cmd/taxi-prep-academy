
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen, CheckCircle, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Mock data for enrolled courses
const enrolledCourses = [
  {
    id: '1',
    title: 'Taxi- und Mietwagenunternehmer-Schein',
    description: 'Umfassender Kurs zur Vorbereitung auf die Prüfung zum Taxi- und Mietwagenunternehmer.',
    progress: 35,
    modules: 4,
    completedModules: 1,
    lastAccessed: '2023-10-22T15:30:00Z',
  },
];

// Mock data for available courses
const availableCourses = [
  {
    id: '2',
    title: 'Aufbaukurs: Betriebswirtschaft für Taxiunternehmer',
    description: 'Vertiefte Einblicke in die betriebswirtschaftlichen Aspekte eines Taxiunternehmens.',
    price: '299',
    modules: 3,
    duration: '18 Stunden',
  },
];

const UserDashboard = ({ auth }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('enrolled');
  
  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/login');
    }
  }, [auth, navigate]);

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Willkommen zurück, {auth.user?.name}!</h1>
          <p className="text-muted-foreground mt-2">
            Hier finden Sie Ihre Kurse und Ihren Lernfortschritt.
          </p>
        </div>
        
        <div className="flex space-x-2 border-b mb-8">
          <button
            className={`pb-2 px-4 font-medium ${
              activeTab === 'enrolled'
                ? 'border-b-2 border-primary text-primary'
                : 'text-muted-foreground'
            }`}
            onClick={() => setActiveTab('enrolled')}
          >
            Meine Kurse
          </button>
          <button
            className={`pb-2 px-4 font-medium ${
              activeTab === 'available'
                ? 'border-b-2 border-primary text-primary'
                : 'text-muted-foreground'
            }`}
            onClick={() => setActiveTab('available')}
          >
            Verfügbare Kurse
          </button>
        </div>
        
        {activeTab === 'enrolled' ? (
          <div className="grid md:grid-cols-2 gap-6">
            {enrolledCourses.length > 0 ? (
              enrolledCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {course.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Fortschritt</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2 w-full" />
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                        <span>
                          {course.completedModules} von {course.modules} Modulen
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>Zuletzt: {formatDate(course.lastAccessed)}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-muted/50 px-6 py-3">
                    <Button asChild variant="secondary" className="w-full">
                      <Link to={`/course/${course.id}`}>
                        Kurs fortsetzen
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-2 text-center py-12 bg-muted/30 rounded-lg">
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">Keine Kurse gefunden</h3>
                <p className="text-muted-foreground mb-6">
                  Sie haben sich noch für keinen Kurs angemeldet.
                </p>
                <Button onClick={() => setActiveTab('available')}>
                  Kurse entdecken
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {availableCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Preis:</span>
                      <span className="font-medium">{course.price} €</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Module:</span>
                      <span className="font-medium">{course.modules}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dauer:</span>
                      <span className="font-medium">{course.duration}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-muted/50 px-6 py-3 flex space-x-2">
                  <Button asChild variant="outline" className="w-1/2">
                    <Link to={`/course-details/${course.id}`}>
                      Details
                    </Link>
                  </Button>
                  <Button className="w-1/2">
                    Jetzt kaufen
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default UserDashboard;
