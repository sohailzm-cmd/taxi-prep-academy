
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Edit, LayoutDashboard, LogOut, MoreHorizontal, Plus, Search, Settings, Trash2, User, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

// Mock data
const initialCoursesData = [
  {
    id: '1',
    title: 'Taxi- und Mietwagenunternehmer-Schein',
    description: 'Umfassender Kurs zur Vorbereitung auf die Prüfung zum Taxi- und Mietwagenunternehmer.',
    modules: 4,
    status: 'published',
    enrollments: 48,
    price: '499',
    created: '2023-05-10T10:30:00Z',
  },
  {
    id: '2',
    title: 'Aufbaukurs: Betriebswirtschaft für Taxiunternehmer',
    description: 'Vertiefte Einblicke in die betriebswirtschaftlichen Aspekte eines Taxiunternehmens.',
    modules: 3,
    status: 'draft',
    enrollments: 0,
    price: '299',
    created: '2023-09-15T14:20:00Z',
  }
];

const AdminCourses = ({ auth }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [courses, setCourses] = useState(initialCoursesData);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    price: '',
  });
  const [courseToDelete, setCourseToDelete] = useState<string | null>(null);

  const handleLogout = () => {
    auth.logout();
    toast({
      title: "Abgemeldet",
      description: "Sie wurden erfolgreich abgemeldet.",
    });
    navigate('/');
  };

  // Filter courses based on search query
  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleCreateCourse = () => {
    if (!newCourse.title || !newCourse.description || !newCourse.price) {
      toast({
        title: "Fehler",
        description: "Bitte füllen Sie alle Felder aus.",
        variant: "destructive",
      });
      return;
    }

    const course = {
      id: `${courses.length + 1}`,
      title: newCourse.title,
      description: newCourse.description,
      modules: 0,
      status: 'draft',
      enrollments: 0,
      price: newCourse.price,
      created: new Date().toISOString(),
    };

    setCourses([...courses, course]);
    setNewCourse({ title: '', description: '', price: '' });
    setIsCreatingCourse(false);

    toast({
      title: "Kurs erstellt",
      description: "Der Kurs wurde erfolgreich erstellt.",
    });
  };

  const handleDeleteCourse = (id) => {
    setCourses(courses.filter(course => course.id !== id));
    setCourseToDelete(null);

    toast({
      title: "Kurs gelöscht",
      description: "Der Kurs wurde erfolgreich gelöscht.",
    });
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar border-r border-sidebar-border hidden md:block">
        <div className="p-4">
          <h2 className="text-lg font-bold flex items-center text-sidebar-foreground">
            <LayoutDashboard className="mr-2 h-5 w-5" />
            Admin Dashboard
          </h2>
        </div>
        <Separator className="bg-sidebar-border" />
        <nav className="p-2">
          <ul className="space-y-1">
            <li>
              <Link
                to="/admin"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent/50"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/courses"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sidebar-foreground bg-sidebar-accent"
              >
                <BookOpen className="h-4 w-4" />
                <span>Kurse</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/users"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent/50"
              >
                <Users className="h-4 w-4" />
                <span>Nutzer</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/settings"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent/50"
              >
                <Settings className="h-4 w-4" />
                <span>Einstellungen</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="absolute bottom-4 w-64 px-2">
          <Separator className="bg-sidebar-border mb-4" />
          <div className="flex items-center gap-3 rounded-md px-3 py-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              <User className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-sidebar-foreground">{auth.user?.name}</p>
              <p className="text-xs text-sidebar-foreground/70">{auth.user?.email}</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="w-full mt-2 border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Abmelden
          </Button>
        </div>
      </aside>

      {/* Mobile navigation - shown only on small screens */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
        <div className="flex justify-around p-2">
          <Link to="/admin" className="flex flex-col items-center p-2">
            <LayoutDashboard className="h-5 w-5" />
            <span className="text-xs mt-1">Dashboard</span>
          </Link>
          <Link to="/admin/courses" className="flex flex-col items-center p-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <span className="text-xs mt-1">Kurse</span>
          </Link>
          <Link to="/admin/users" className="flex flex-col items-center p-2">
            <Users className="h-5 w-5" />
            <span className="text-xs mt-1">Nutzer</span>
          </Link>
          <Link to="/admin/settings" className="flex flex-col items-center p-2">
            <Settings className="h-5 w-5" />
            <span className="text-xs mt-1">Einstellungen</span>
          </Link>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
        <div className="container px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Kursverwaltung</h1>
              <p className="text-muted-foreground">Erstellen und verwalten Sie Ihre Kurse</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Dialog open={isCreatingCourse} onOpenChange={setIsCreatingCourse}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Neuen Kurs erstellen
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Neuen Kurs erstellen</DialogTitle>
                    <DialogDescription>
                      Füllen Sie die Details aus, um einen neuen Kurs zu erstellen.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Kurstitel</Label>
                      <Input 
                        id="title" 
                        placeholder="z.B. Taxi- und Mietwagenunternehmer-Schein" 
                        value={newCourse.title}
                        onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Beschreibung</Label>
                      <Textarea 
                        id="description" 
                        placeholder="Kurzbeschreibung des Kurses" 
                        value={newCourse.description}
                        onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price">Preis (€)</Label>
                      <Input 
                        id="price" 
                        placeholder="z.B. 499" 
                        value={newCourse.price}
                        onChange={(e) => setNewCourse({...newCourse, price: e.target.value})}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreatingCourse(false)}>
                      Abbrechen
                    </Button>
                    <Button onClick={handleCreateCourse}>
                      Kurs erstellen
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Search and filter */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Suche nach Kursen..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Courses Table */}
          <Card>
            <CardHeader>
              <CardTitle>Kurse</CardTitle>
              <CardDescription>
                Verwalten Sie Ihre Kurse und deren Module
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredCourses.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Kurs</th>
                        <th className="text-left py-3 px-4 hidden md:table-cell">Status</th>
                        <th className="text-left py-3 px-4 hidden md:table-cell">Module</th>
                        <th className="text-left py-3 px-4 hidden md:table-cell">Teilnehmer</th>
                        <th className="text-left py-3 px-4 hidden md:table-cell">Preis</th>
                        <th className="text-left py-3 px-4 hidden md:table-cell">Erstellt am</th>
                        <th className="text-right py-3 px-4">Aktionen</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCourses.map((course) => (
                        <tr key={course.id} className="border-b">
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium">{course.title}</p>
                              <p className="text-sm text-muted-foreground line-clamp-1 md:hidden">
                                {course.status === 'published' ? 'Veröffentlicht' : 'Entwurf'} • {course.modules} Module • {course.price}€
                              </p>
                            </div>
                          </td>
                          <td className="py-3 px-4 hidden md:table-cell">
                            <Badge 
                              variant={course.status === 'published' ? 'default' : 'secondary'}
                            >
                              {course.status === 'published' ? 'Veröffentlicht' : 'Entwurf'}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 hidden md:table-cell">{course.modules}</td>
                          <td className="py-3 px-4 hidden md:table-cell">{course.enrollments}</td>
                          <td className="py-3 px-4 hidden md:table-cell">{course.price}€</td>
                          <td className="py-3 px-4 hidden md:table-cell">{formatDate(course.created)}</td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex justify-end">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                asChild
                                className="hidden sm:flex mr-2"
                              >
                                <Link to={`/admin/modules/${course.id}`}>
                                  Module bearbeiten
                                </Link>
                              </Button>

                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem asChild>
                                    <Link to={`/admin/modules/${course.id}`} className="cursor-pointer">
                                      <BookOpen className="mr-2 h-4 w-4" />
                                      Module bearbeiten
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem asChild>
                                    <Link to={`/admin/courses/edit/${course.id}`} className="cursor-pointer">
                                      <Edit className="mr-2 h-4 w-4" />
                                      Kurs bearbeiten
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    className="text-red-600 focus:text-red-600"
                                    onClick={() => setCourseToDelete(course.id)}
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Kurs löschen
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-6">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Keine Kurse gefunden</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery ? 'Keine Kurse entsprechen Ihrer Suche.' : 'Sie haben noch keine Kurse erstellt.'}
                  </p>
                  {!searchQuery && (
                    <Button onClick={() => setIsCreatingCourse(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Ersten Kurs erstellen
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Delete Course Dialog */}
      <Dialog open={courseToDelete !== null} onOpenChange={(open) => !open && setCourseToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Kurs löschen</DialogTitle>
            <DialogDescription>
              Sind Sie sicher, dass Sie diesen Kurs löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCourseToDelete(null)}>
              Abbrechen
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => courseToDelete && handleDeleteCourse(courseToDelete)}
            >
              Löschen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCourses;
