import React, { useState, useEffect } from 'react';
import { Save, Users, BarChart3, Settings, LogOut, Upload, Eye, Filter } from 'lucide-react';
import { GalleryManager } from './GalleryManager';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useSiteContent } from '@/hooks/useSiteContent';
import { supabase } from '@/integrations/supabase/client';

export const AdminPanel: React.FC = () => {
  const { user, signOut, isAdmin } = useAuth();
  const { siteContent, updateContent } = useSiteContent();
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [editableContent, setEditableContent] = useState<any>({});
  const { toast } = useToast();

  useEffect(() => {
    // Load submissions from Supabase
    const fetchSubmissions = async () => {
      if (!isAdmin) return;
      
      try {
        const { data, error } = await supabase
          .from('contact_submissions')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setSubmissions(data || []);
      } catch (error) {
        console.error('Error fetching submissions:', error);
        toast({
          title: "Error",
          description: "Failed to load submissions",
          variant: "destructive"
        });
      }
    };

    fetchSubmissions();
    
    // Set editable content from database
    setEditableContent(siteContent);
  }, [isAdmin, siteContent, toast]);

  const handleSaveContent = async (key: string, value: any) => {
    const result = await updateContent(key, value);
    if (result.success) {
      toast({
        title: "Content Saved",
        description: "Your changes have been saved successfully",
      });
    } else {
      toast({
        title: "Save Failed",
        description: "Failed to save changes. Please try again.",
        variant: "destructive"
      });
    }
  };

  const updateLocalContent = (path: string, value: string) => {
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

  // Redirect if not admin
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background">
        <Card className="w-full max-w-md luxury-shadow">
          <CardContent className="p-8 text-center">
            <h3 className="text-lg font-semibold mb-2">Access Denied</h3>
            <p className="text-muted-foreground">Please log in to access the admin panel.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background">
        <Card className="w-full max-w-md luxury-shadow">
          <CardContent className="p-8 text-center">
            <h3 className="text-lg font-semibold mb-2">Admin Access Required</h3>
            <p className="text-muted-foreground mb-4">You don't have permission to access this area.</p>
            <p className="text-sm text-muted-foreground">Current user: {user.email}</p>
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
            <Button variant="outline" onClick={signOut}>
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
                {['hero.title', 'hero.subtitle', 'hero.description', 'about.title', 'about.description', 'contact.title', 'contact.description'].map((field) => (
                  <div key={field} className="space-y-2">
                    <Label htmlFor={field} className="font-medium">
                      {field.split('.').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' → ')}
                    </Label>
                    <div className="flex space-x-2">
                      {field.includes('description') ? (
                        <Textarea
                          id={field}
                          value={getNestedValue(editableContent, field)}
                          onChange={(e) => updateLocalContent(field, e.target.value)}
                          rows={3}
                          className="resize-none flex-1"
                        />
                      ) : (
                        <Input
                          id={field}
                          value={getNestedValue(editableContent, field)}
                          onChange={(e) => updateLocalContent(field, e.target.value)}
                          className="flex-1"
                        />
                      )}
                      <Button 
                        onClick={() => handleSaveContent(field.split('.')[0], editableContent[field.split('.')[0]])}
                        className="btn-luxury"
                        size="sm"
                      >
                        <Save className="w-4 h-4" />
                      </Button>
                    </div>
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
                              <h4 className="font-semibold text-lg">{submission.name}</h4>
                              <p className="text-muted-foreground">{submission.email}</p>
                              <p className="text-muted-foreground">{submission.phone}</p>
                            </div>
                            <div>
                              <p><strong>Investment:</strong> {submission.investment_interest}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(submission.created_at).toLocaleDateString()}
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
                <GalleryManager />
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
                        {submissions.filter(s => new Date(s.created_at).getMonth() === new Date().getMonth()).length}
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
                        {submissions.filter(s => s.investment_interest?.includes('$5M+')).length}
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