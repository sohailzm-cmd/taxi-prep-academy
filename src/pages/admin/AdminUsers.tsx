
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
import { useToast } from '@/hooks/use-toast';

// Mock data for users
const initialUsersData = [
  {
    id: '1',
    name: 'Max Mustermann',
    email: 'max@example.com',
    role: 'user',
    status: 'active',
    courses: 1,
    created: '2023-05-10T10:30:00Z',
  },
  {
    id: '2',
    name: 'Anna Schmidt',
    email: 'anna@example.com',
    role: 'user',
    status: 'active',
    courses: 2,
    created: '2023-06-15T14:20:00Z',
  },
  {
    id: '3',
    name: 'Thomas Weber',
    email: 'thomas@example.com',
    role: 'user',
    status: 'inactive',
    courses: 0,
    created: '2023-07-22T09:45:00Z',
  },
  {
    id: 'admin1',
    name: 'Admin User',
    email: 'admin@tum-academy.de',
    role: 'admin',
    status: 'active',
    courses: 2,
    created: '2023-01-05T08:30:00Z',
  }
];

const AdminUsers = ({ auth }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [users, setUsers] = useState(initialUsersData);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });

  const handleLogout = () => {
    auth.logout();
    toast({
      title: "Abgemeldet",
      description: "Sie wurden erfolgreich abgemeldet.",
    });
    navigate('/');
  };

  // Filter users based on search query
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleCreateUser = () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      toast({
        title: "Fehler",
        description: "Bitte füllen Sie alle Felder aus.",
        variant: "destructive",
      });
      return;
    }

    const user = {
      id: `${users.length + 1}`,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: 'active',
      courses: 0,
      created: new Date().toISOString(),
    };

    setUsers([...users, user]);
    setNewUser({ name: '', email: '', password: '', role: 'user' });
    setIsCreatingUser(false);

    toast({
      title: "Benutzer erstellt",
      description: "Der Benutzer wurde erfolgreich erstellt.",
    });
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
    setUserToDelete(null);

    toast({
      title: "Benutzer gelöscht",
      description: "Der Benutzer wurde erfolgreich gelöscht.",
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
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent/50"
              >
                <BookOpen className="h-4 w-4" />
                <span>Kurse</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/users"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sidebar-foreground bg-sidebar-accent"
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
            <BookOpen className="h-5 w-5" />
            <span className="text-xs mt-1">Kurse</span>
          </Link>
          <Link to="/admin/users" className="flex flex-col items-center p-2">
            <Users className="h-5 w-5 text-primary" />
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
              <h1 className="text-2xl font-bold">Nutzerverwaltung</h1>
              <p className="text-muted-foreground">Verwalten Sie Benutzerkonten</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Dialog open={isCreatingUser} onOpenChange={setIsCreatingUser}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Neuen Benutzer erstellen
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Neuen Benutzer erstellen</DialogTitle>
                    <DialogDescription>
                      Füllen Sie die Details aus, um einen neuen Benutzer zu erstellen.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input 
                        id="name" 
                        placeholder="z.B. Max Mustermann" 
                        value={newUser.name}
                        onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-Mail</Label>
                      <Input 
                        id="email" 
                        type="email"
                        placeholder="beispiel@email.de" 
                        value={newUser.email}
                        onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Passwort</Label>
                      <Input 
                        id="password" 
                        type="password"
                        placeholder="Passwort" 
                        value={newUser.password}
                        onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Rolle</Label>
                      <select 
                        id="role"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        value={newUser.role}
                        onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                      >
                        <option value="user">Benutzer</option>
                        <option value="admin">Administrator</option>
                      </select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreatingUser(false)}>
                      Abbrechen
                    </Button>
                    <Button onClick={handleCreateUser}>
                      Benutzer erstellen
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
                placeholder="Suche nach Benutzern..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Users Table */}
          <Card>
            <CardHeader>
              <CardTitle>Benutzer</CardTitle>
              <CardDescription>
                Alle registrierten Benutzer auf der Plattform
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredUsers.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Benutzer</th>
                        <th className="text-left py-3 px-4 hidden md:table-cell">Rolle</th>
                        <th className="text-left py-3 px-4 hidden md:table-cell">Status</th>
                        <th className="text-left py-3 px-4 hidden md:table-cell">Kurse</th>
                        <th className="text-left py-3 px-4 hidden md:table-cell">Registriert am</th>
                        <th className="text-right py-3 px-4">Aktionen</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b">
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                                <User className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-muted-foreground">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 hidden md:table-cell">
                            <Badge 
                              variant={user.role === 'admin' ? 'default' : 'secondary'}
                            >
                              {user.role === 'admin' ? 'Administrator' : 'Benutzer'}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 hidden md:table-cell">
                            <Badge 
                              variant={user.status === 'active' ? 'outline' : 'secondary'}
                              className={user.status === 'active' ? 'text-green-500 border-green-200 bg-green-50' : ''}
                            >
                              {user.status === 'active' ? 'Aktiv' : 'Inaktiv'}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 hidden md:table-cell">{user.courses}</td>
                          <td className="py-3 px-4 hidden md:table-cell">{formatDate(user.created)}</td>
                          <td className="py-3 px-4 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                  <Link to={`/admin/users/edit/${user.id}`} className="cursor-pointer">
                                    <Edit className="mr-2 h-4 w-4" />
                                    Benutzer bearbeiten
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link to={`/admin/users/courses/${user.id}`} className="cursor-pointer">
                                    <BookOpen className="mr-2 h-4 w-4" />
                                    Kurse verwalten
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  className="text-red-600 focus:text-red-600"
                                  onClick={() => setUserToDelete(user.id)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Benutzer löschen
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-6">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Keine Benutzer gefunden</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery ? 'Keine Benutzer entsprechen Ihrer Suche.' : 'Es wurden noch keine Benutzer erstellt.'}
                  </p>
                  {!searchQuery && (
                    <Button onClick={() => setIsCreatingUser(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Ersten Benutzer erstellen
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Delete User Dialog */}
      <Dialog open={userToDelete !== null} onOpenChange={(open) => !open && setUserToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Benutzer löschen</DialogTitle>
            <DialogDescription>
              Sind Sie sicher, dass Sie diesen Benutzer löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUserToDelete(null)}>
              Abbrechen
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => userToDelete && handleDeleteUser(userToDelete)}
            >
              Löschen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUsers;
