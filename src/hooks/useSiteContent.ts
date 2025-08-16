import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useSiteContent = () => {
  const [siteContent, setSiteContent] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const fetchSiteContent = async () => {
    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('*');

      if (error) throw error;

      // Convert array to object for easier access
      const contentObj = data.reduce((acc, item) => {
        acc[item.key] = typeof item.value === 'string' ? JSON.parse(item.value) : item.value;
        return acc;
      }, {} as any);

      setSiteContent(contentObj);
    } catch (error) {
      console.error('Error fetching site content:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSiteContent();

    // Set up real-time subscription for content updates
    const channel = supabase
      .channel('site_content_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'site_content'
        },
        () => {
          fetchSiteContent();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const updateContent = async (key: string, value: any) => {
    try {
      const { error } = await supabase
        .from('site_content')
        .upsert({
          key,
          value: JSON.stringify(value),
          updated_by: (await supabase.auth.getUser()).data.user?.id
        });

      if (error) throw error;

      // Update local state
      setSiteContent(prev => ({
        ...prev,
        [key]: value
      }));

      return { success: true };
    } catch (error) {
      console.error('Error updating content:', error);
      return { success: false, error };
    }
  };

  return {
    siteContent,
    loading,
    updateContent,
    refetch: fetchSiteContent
  };
};