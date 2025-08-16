import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useGallery = () => {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;

      setImages(data || []);
    } catch (error) {
      console.error('Error fetching gallery images:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();

    // Set up real-time subscription for gallery updates
    const channel = supabase
      .channel('gallery_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'gallery_images'
        },
        () => {
          fetchImages();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const addImage = async (imageData: any) => {
    try {
      const { error } = await supabase
        .from('gallery_images')
        .insert({
          ...imageData,
          updated_by: (await supabase.auth.getUser()).data.user?.id
        });

      if (error) throw error;

      return { success: true };
    } catch (error) {
      console.error('Error adding image:', error);
      return { success: false, error };
    }
  };

  const updateImage = async (id: string, imageData: any) => {
    try {
      const { error } = await supabase
        .from('gallery_images')
        .update({
          ...imageData,
          updated_by: (await supabase.auth.getUser()).data.user?.id
        })
        .eq('id', id);

      if (error) throw error;

      return { success: true };
    } catch (error) {
      console.error('Error updating image:', error);
      return { success: false, error };
    }
  };

  const deleteImage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('gallery_images')
        .update({ is_active: false })
        .eq('id', id);

      if (error) throw error;

      return { success: true };
    } catch (error) {
      console.error('Error deleting image:', error);
      return { success: false, error };
    }
  };

  return {
    images,
    loading,
    addImage,
    updateImage,
    deleteImage,
    refetch: fetchImages
  };
};