
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BarChart, BookOpen, LayoutDashboard, LogOut, Settings, User, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

// Mock data
const statsData = [
  { title: 'Gesamte Kurse', value: '2', icon: BookOpen, change: '+1 diesen Monat' },
  { title: 'Aktive Nutzer', value: '48', icon: Users, change: '+12 diesen Monat' },
  { title: 'Absolvierte Module', value: '124', icon: BarChart, change: '+26 diesen Monat' },
];

const recentUsersData = [
  { id: '1', name: 'Max Mustermann', email: 'max@example.com', date: '2023-10-20T15:30:00Z' },
  { id: '2', name: 'Anna Schmidt', email: 'anna@example.com', date: '2023-10-19T09:45:00Z' },
  { id: '3', name: 'Thomas Weber', email: 'thomas@example.com', date: '2023-10-18T14:20:00Z' },
];

const AdminDashboard = ({ auth }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    auth.logout();
    toast({
      title: "Abgemeldet",
      description: "Sie wurden erfolgreich abgemeldet.",
    });
    navigate('/');
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
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
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sidebar-foreground bg-sidebar-accent"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/courses"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent/50"
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
            <LayoutDashboard className="h-5 w-5 text-primary" />
            <span className="text-xs mt-1">Dashboard</span>
          </Link>
          <Link to="/admin/courses" className="flex flex-col items-center p-2">
            <BookOpen className="h-5 w-5" />
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
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Übersicht über Ihre Plattform</p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-2">
              <Button variant="outline" size="sm" className="md:hidden" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Abmelden
              </Button>
              <Button asChild size="sm">
                <Link to="/admin/courses/new">
                  Neuen Kurs erstellen
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {statsData.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Users */}
            <Card>
              <CardHeader>
                <CardTitle>Neu registrierte Nutzer</CardTitle>
                <CardDescription>Die letzten Registrierungen auf der Plattform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUsersData.map((user) => (
                    <div key={user.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <User className="h-5 w-5" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatDate(user.date)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link to="/admin/users">
                    Alle Nutzer anzeigen
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Schnellzugriff</CardTitle>
                <CardDescription>Häufig verwendete Aktionen</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button asChild variant="outline" className="h-auto py-4 justify-start">
                  <Link to="/admin/courses">
                    <BookOpen className="h-5 w-5 mr-2" />
                    <div className="text-left">
                      <div className="font-medium">Kurse verwalten</div>
                      <div className="text-xs text-muted-foreground">Module und Inhalte bearbeiten</div>
                    </div>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-auto py-4 justify-start">
                  <Link to="/admin/users">
                    <Users className="h-5 w-5 mr-2" />
                    <div className="text-left">
                      <div className="font-medium">Nutzer verwalten</div>
                      <div className="text-xs text-muted-foreground">Nutzerkonten bearbeiten</div>
                    </div>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-auto py-4 justify-start">
                  <Link to="/admin/courses/new">
                    <BookOpen className="h-5 w-5 mr-2" />
                    <div className="text-left">
                      <div className="font-medium">Neuen Kurs erstellen</div>
                      <div className="text-xs text-muted-foreground">Kurs hinzufügen</div>
                    </div>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-auto py-4 justify-start">
                  <Link to="/admin/settings">
                    <Settings className="h-5 w-5 mr-2" />
                    <div className="text-left">
                      <div className="font-medium">Einstellungen</div>
                      <div className="text-xs text-muted-foreground">Plattform konfigurieren</div>
                    </div>
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
