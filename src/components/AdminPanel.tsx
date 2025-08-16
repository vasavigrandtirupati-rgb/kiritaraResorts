import React, { useState, useEffect } from 'react';
import { Lock, Eye, EyeOff, Save, Upload, Users, BarChart3, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { siteData, adminConfig } from '@/data/siteData.js';

export const AdminPanel: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [editableContent, setEditableContent] = useState<any>({});
  const [submissions, setSubmissions] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Check if already authenticated
    const isLoggedIn = localStorage.getItem('kiritara-admin-auth') === 'true';
    setIsAuthenticated(isLoggedIn);

    // Load submissions
    const savedSubmissions = JSON.parse(localStorage.getItem('kiritara-submissions') || '[]');
    setSubmissions(savedSubmissions);

    // Load editable content
    const savedContent = JSON.parse(localStorage.getItem('kiritara-content') || '{}');
    setEditableContent({ ...siteData, ...savedContent });
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (credentials.username === adminConfig.credentials.username && 
        credentials.password === adminConfig.credentials.password) {
      setIsAuthenticated(true);
      localStorage.setItem('kiritara-admin-auth', 'true');
      toast({
        title: "Login Successful",
        description: "Welcome to the Kiritara Admin Panel",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid username or password",
        variant: "destructive"
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('kiritara-admin-auth');
    setCredentials({ username: '', password: '' });
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };

  const saveContent = () => {
    localStorage.setItem('kiritara-content', JSON.stringify(editableContent));
    toast({
      title: "Content Saved",
      description: "Your changes have been saved successfully",
    });
  };

  const updateContent = (path: string, value: string) => {
    const keys = path.split('.');
    const newContent = { ...editableContent };
    let current = newContent;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    setEditableContent(newContent);
  };

  const getNestedValue = (obj: any, path: string): string => {
    return path.split('.').reduce((current, key) => current && current[key], obj) || '';
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background">
        <Card className="w-full max-w-md luxury-shadow">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="font-display text-2xl">Admin Access</CardTitle>
            <p className="text-muted-foreground">Kiritara Resorts Management</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                  placeholder="Enter username"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={credentials.password}
                    onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Enter password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              
              <Button type="submit" className="btn-luxury w-full">
                <Lock className="w-4 h-4 mr-2" />
                Access Admin Panel
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">Admin Panel</h1>
            <p className="text-muted-foreground">Kiritara Resorts Management System</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button onClick={saveContent} className="btn-luxury">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <Tabs defaultValue="content" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="submissions">Submissions ({submissions.length})</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Content Management */}
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Content Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {adminConfig.editableFields.map((field) => (
                  <div key={field} className="space-y-2">
                    <Label htmlFor={field} className="font-medium">
                      {field.split('.').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' → ')}
                    </Label>
                    {field.includes('description') ? (
                      <Textarea
                        id={field}
                        value={getNestedValue(editableContent, field)}
                        onChange={(e) => updateContent(field, e.target.value)}
                        rows={3}
                        className="resize-none"
                      />
                    ) : (
                      <Input
                        id={field}
                        value={getNestedValue(editableContent, field)}
                        onChange={(e) => updateContent(field, e.target.value)}
                      />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Submissions */}
          <TabsContent value="submissions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Investment Inquiries
                </CardTitle>
              </CardHeader>
              <CardContent>
                {submissions.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No submissions yet</p>
                ) : (
                  <div className="space-y-4">
                    {submissions.map((submission) => (
                      <Card key={submission.id} className="border-l-4 border-l-primary">
                        <CardContent className="p-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold text-lg">{submission.fullName}</h4>
                              <p className="text-muted-foreground">{submission.email}</p>
                              <p className="text-muted-foreground">{submission.phone}</p>
                            </div>
                            <div>
                              <p><strong>Investment:</strong> {submission.investmentAmount}</p>
                              <p><strong>Timeline:</strong> {submission.timeline}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(submission.timestamp).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          {submission.message && (
                            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                              <p className="text-sm">{submission.message}</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Gallery Management */}
          <TabsContent value="gallery" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="w-5 h-5 mr-2" />
                  Gallery Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Gallery management will be available in the next update</p>
                  <p className="text-sm text-muted-foreground mt-2">Currently using pre-loaded resort images</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground">Total Submissions</p>
                      <p className="text-2xl font-bold">{submissions.length}</p>
                    </div>
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground">This Month</p>
                      <p className="text-2xl font-bold">
                        {submissions.filter(s => new Date(s.timestamp).getMonth() === new Date().getMonth()).length}
                      </p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground">High Value Leads</p>
                      <p className="text-2xl font-bold">
                        {submissions.filter(s => s.investmentAmount.includes('$5M+')).length}
                      </p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};