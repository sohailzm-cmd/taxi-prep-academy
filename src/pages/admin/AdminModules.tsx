
import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
const mockModules = {
  '1': [
    {
      id: 'm1',
      title: 'Einführung in die Taxi- und Mietwagenbranche',
      description: 'Marktanalyse, aktuelle Trends und grundlegende Brancheninformationen.',
      order: 1,
      duration: '4 Stunden',
      lessons: 3,
      status: 'published'
    },
    {
      id: 'm2',
      title: 'Gesetzliche Grundlagen',
      description: 'Rechte & Pflichten eines Unternehmers, Verkehrsvorschriften und Arbeitsrecht.',
      order: 2,
      duration: '8 Stunden',
      lessons: 3,
      status: 'published'
    },
    {
      id: 'm3',
      title: 'Betriebswirtschaftliche Kenntnisse',
      description: 'Unternehmensplanung, Finanzmanagement, Buchhaltung & Steuerrecht.',
      order: 3,
      duration: '12 Stunden',
      lessons: 3,
      status: 'draft'
    },
    {
      id: 'm4',
      title: 'Marketingstrategien',
      description: 'Kundengewinnung, Kundenbindung und effektives Marketing für Ihr Unternehmen.',
      order: 4,
      duration: '10 Stunden',
      lessons: 3,
      status: 'draft'
    }
  ],
  '2': [
    {
      id: 'm5',
      title: 'Finanzwesen für Taxiunternehmer',
      description: 'Vertiefung des Finanzwissens und der Buchhaltungspraktiken.',
      order: 1,
      duration: '6 Stunden',
      lessons: 2,
      status: 'published'
    },
    {
      id: 'm6',
      title: 'Personalmanagement',
      description: 'Effektive Verwaltung von Mitarbeitern und Fahrern.',
      order: 2,
      duration: '5 Stunden',
      lessons: 2,
      status: 'draft'
    },
    {
      id: 'm7',
      title: 'Optimierung des Geschäftsmodells',
      description: 'Strategien zur Verbesserung der Betriebseffizienz und Gewinnmaximierung.',
      order: 3,
      duration: '7 Stunden',
      lessons: 3,
      status: 'draft'
    }
  ]
};

// Mock course data
const mockCourses = {
  '1': {
    id: '1',
    title: 'Taxi- und Mietwagenunternehmer-Schein',
    description: 'Umfassender Kurs zur Vorbereitung auf die Prüfung zum Taxi- und Mietwagenunternehmer.'
  },
  '2': {
    id: '2',
    title: 'Aufbaukurs: Betriebswirtschaft für Taxiunternehmer',
    description: 'Vertiefte Einblicke in die betriebswirtschaftlichen Aspekte eines Taxiunternehmens.'
  }
};

const AdminModules = ({ auth }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { courseId } = useParams();
  const [modules, setModules] = useState(mockModules[courseId] || []);
  const [course, setCourse] = useState(mockCourses[courseId] || {});
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreatingModule, setIsCreatingModule] = useState(false);
  const [moduleToDelete, setModuleToDelete] = useState(null);
  const [newModule, setNewModule] = useState({
    title: '',
    description: '',
    duration: '',
  });

  const handleLogout = () => {
    auth.logout();
    toast({
      title: "Abgemeldet",
      description: "Sie wurden erfolgreich abgemeldet.",
    });
    navigate('/');
  };

  // Filter modules based on search query
  const filteredModules = modules.filter(module => 
    module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    module.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort modules by order
  const sortedModules = [...filteredModules].sort((a, b) => a.order - b.order);

  const handleCreateModule = () => {
    if (!newModule.title || !newModule.description || !newModule.duration) {
      toast({
        title: "Fehler",
        description: "Bitte füllen Sie alle Felder aus.",
        variant: "destructive",
      });
      return;
    }

    const moduleOrder = modules.length > 0 
      ? Math.max(...modules.map(m => m.order)) + 1 
      : 1;

    const module = {
      id: `m${Date.now()}`,
      title: newModule.title,
      description: newModule.description,
      duration: newModule.duration,
      order: moduleOrder,
      lessons: 0,
      status: 'draft'
    };

    setModules([...modules, module]);
    setNewModule({ title: '', description: '', duration: '' });
    setIsCreatingModule(false);

    toast({
      title: "Modul erstellt",
      description: "Das Modul wurde erfolgreich erstellt.",
    });
  };

  const handleDeleteModule = (id) => {
    setModules(modules.filter(module => module.id !== id));
    setModuleToDelete(null);

    toast({
      title: "Modul gelöscht",
      description: "Das Modul wurde erfolgreich gelöscht.",
    });
  };

  const handleMoveUp = (moduleId) => {
    const moduleIndex = modules.findIndex(m => m.id === moduleId);
    if (moduleIndex <= 0) return;

    const updatedModules = [...modules];
    const currentOrder = updatedModules[moduleIndex].order;
    const prevOrder = updatedModules[moduleIndex - 1].order;
    
    updatedModules[moduleIndex].order = prevOrder;
    updatedModules[moduleIndex - 1].order = currentOrder;
    
    setModules(updatedModules);
  };

  const handleMoveDown = (moduleId) => {
    const moduleIndex = modules.findIndex(m => m.id === moduleId);
    if (moduleIndex >= modules.length - 1) return;

    const updatedModules = [...modules];
    const currentOrder = updatedModules[moduleIndex].order;
    const nextOrder = updatedModules[moduleIndex + 1].order;
    
    updatedModules[moduleIndex].order = nextOrder;
    updatedModules[moduleIndex + 1].order = currentOrder;
    
    setModules(updatedModules);
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
              <div className="flex items-center">
                <Link to="/admin/courses" className="text-primary hover:underline mr-2">
                  Kurse
                </Link>
                <span className="text-muted-foreground">/</span>
                <h1 className="text-2xl font-bold ml-2">{course.title}</h1>
              </div>
              <p className="text-muted-foreground">Verwalten Sie die Module für diesen Kurs</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Dialog open={isCreatingModule} onOpenChange={setIsCreatingModule}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Neues Modul erstellen
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Neues Modul erstellen</DialogTitle>
                    <DialogDescription>
                      Füllen Sie die Details aus, um ein neues Modul zu erstellen.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Modultitel</Label>
                      <Input 
                        id="title" 
                        placeholder="z.B. Einführung in die Taxi- und Mietwagenbranche" 
                        value={newModule.title}
                        onChange={(e) => setNewModule({...newModule, title: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Beschreibung</Label>
                      <Textarea 
                        id="description" 
                        placeholder="Kurzbeschreibung des Moduls" 
                        value={newModule.description}
                        onChange={(e) => setNewModule({...newModule, description: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Dauer</Label>
                      <Input 
                        id="duration" 
                        placeholder="z.B. 4 Stunden" 
                        value={newModule.duration}
                        onChange={(e) => setNewModule({...newModule, duration: e.target.value})}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreatingModule(false)}>
                      Abbrechen
                    </Button>
                    <Button onClick={handleCreateModule}>
                      Modul erstellen
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Suche nach Modulen..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Modules List */}
          <Card>
            <CardHeader>
              <CardTitle>Module</CardTitle>
              <CardDescription>
                Verwalten Sie die Module und deren Reihenfolge
              </CardDescription>
            </CardHeader>
            <CardContent>
              {sortedModules.length > 0 ? (
                <div className="space-y-4">
                  {sortedModules.map((module, index) => (
                    <Card key={module.id} className="overflow-hidden">
                      <div className="flex items-start justify-between p-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mr-4 bg-primary/10 text-primary rounded-full h-10 w-10 flex items-center justify-center">
                            {module.order}
                          </div>
                          <div>
                            <div className="flex items-center">
                              <h3 className="text-lg font-semibold">{module.title}</h3>
                              <Badge 
                                variant={module.status === 'published' ? 'default' : 'secondary'}
                                className="ml-2"
                              >
                                {module.status === 'published' ? 'Veröffentlicht' : 'Entwurf'}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{module.description}</p>
                            <div className="flex items-center mt-2 text-sm text-muted-foreground">
                              <span className="mr-4">Dauer: {module.duration}</span>
                              <span>Lektionen: {module.lessons}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex">
                          <div className="flex flex-col mr-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              onClick={() => handleMoveUp(module.id)}
                              disabled={index === 0}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m18 15-6-6-6 6"/>
                              </svg>
                              <span className="sr-only">Nach oben</span>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              onClick={() => handleMoveDown(module.id)}
                              disabled={index === sortedModules.length - 1}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m6 9 6 6 6-6"/>
                              </svg>
                              <span className="sr-only">Nach unten</span>
                            </Button>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Aktionen</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link to={`/admin/modules/${courseId}/lessons/${module.id}`} className="cursor-pointer">
                                  <Edit className="mr-2 h-4 w-4" />
                                  Lektionen bearbeiten
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link to={`/admin/modules/${courseId}/edit/${module.id}`} className="cursor-pointer">
                                  <Edit className="mr-2 h-4 w-4" />
                                  Modul bearbeiten
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-red-600 focus:text-red-600"
                                onClick={() => setModuleToDelete(module.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Modul löschen
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Keine Module gefunden</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery ? 'Keine Module entsprechen Ihrer Suche.' : 'Sie haben noch keine Module für diesen Kurs erstellt.'}
                  </p>
                  {!searchQuery && (
                    <Button onClick={() => setIsCreatingModule(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Erstes Modul erstellen
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Delete Module Dialog */}
      <Dialog open={moduleToDelete !== null} onOpenChange={(open) => !open && setModuleToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modul löschen</DialogTitle>
            <DialogDescription>
              Sind Sie sicher, dass Sie dieses Modul löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModuleToDelete(null)}>
              Abbrechen
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => moduleToDelete && handleDeleteModule(moduleToDelete)}
            >
              Löschen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminModules;
