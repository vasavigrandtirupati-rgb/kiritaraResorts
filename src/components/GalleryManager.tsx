import React, { useState } from 'react';
import { Upload, Edit, Trash2, Save, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useGallery } from '@/hooks/useGallery';
import { supabase } from '@/integrations/supabase/client';

interface GalleryImage {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  sort_order: number;
  is_active: boolean;
}

interface ImageFormData {
  title: string;
  description: string;
  sort_order: number;
}

export const GalleryManager: React.FC = () => {
  const { images, loading, addImage, updateImage, deleteImage } = useGallery();
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [uploadingFile, setUploadingFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<ImageFormData>({
    title: '',
    description: '',
    sort_order: 0
  });
  const { toast } = useToast();

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `gallery/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('gallery-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('gallery-images')
        .getPublicUrl(filePath);

      return urlData.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Upload Failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive"
      });
      return null;
    }
  };

  const handleAddImage = async () => {
    if (!uploadingFile || !formData.title) {
      toast({
        title: "Missing Information",
        description: "Please select an image and provide a title.",
        variant: "destructive"
      });
      return;
    }

    const imageUrl = await uploadImage(uploadingFile);
    if (!imageUrl) return;

    const result = await addImage({
      title: formData.title,
      description: formData.description,
      image_url: imageUrl,
      sort_order: formData.sort_order || images.length
    });

    if (result.success) {
      toast({
        title: "Image Added",
        description: "New gallery image has been added successfully.",
      });
      setIsAddingNew(false);
      setUploadingFile(null);
      setFormData({ title: '', description: '', sort_order: 0 });
    } else {
      toast({
        title: "Failed to Add Image",
        description: "Could not add the image. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleUpdateImage = async () => {
    if (!editingImage) return;

    let imageUrl = editingImage.image_url;
    
    if (uploadingFile) {
      const newImageUrl = await uploadImage(uploadingFile);
      if (newImageUrl) {
        imageUrl = newImageUrl;
      }
    }

    const result = await updateImage(editingImage.id, {
      title: formData.title,
      description: formData.description,
      image_url: imageUrl,
      sort_order: formData.sort_order
    });

    if (result.success) {
      toast({
        title: "Image Updated",
        description: "Gallery image has been updated successfully.",
      });
      setEditingImage(null);
      setUploadingFile(null);
      setFormData({ title: '', description: '', sort_order: 0 });
    } else {
      toast({
        title: "Update Failed",
        description: "Could not update the image. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteImage = async (id: string) => {
    const result = await deleteImage(id);
    if (result.success) {
      toast({
        title: "Image Deleted",
        description: "Gallery image has been removed.",
      });
    } else {
      toast({
        title: "Delete Failed",
        description: "Could not delete the image. Please try again.",
        variant: "destructive"
      });
    }
  };

  const startEdit = (image: GalleryImage) => {
    setEditingImage(image);
    setFormData({
      title: image.title,
      description: image.description || '',
      sort_order: image.sort_order
    });
    setUploadingFile(null);
  };

  const cancelEdit = () => {
    setEditingImage(null);
    setIsAddingNew(false);
    setUploadingFile(null);
    setFormData({ title: '', description: '', sort_order: 0 });
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading gallery images...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Gallery Images ({images.length})</h3>
        <Button onClick={() => setIsAddingNew(true)} className="btn-luxury">
          <Upload className="w-4 h-4 mr-2" />
          Add New Image
        </Button>
      </div>

      {(isAddingNew || editingImage) && (
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ImageIcon className="w-5 h-5 mr-2" />
              {editingImage ? 'Edit Image' : 'Add New Image'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="image-upload">Image File</Label>
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setUploadingFile(file);
                }}
                className="cursor-pointer"
              />
              {editingImage && !uploadingFile && (
                <p className="text-sm text-muted-foreground">
                  Leave empty to keep current image
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter image title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sort-order">Sort Order</Label>
                <Input
                  id="sort-order"
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) => setFormData(prev => ({ ...prev, sort_order: parseInt(e.target.value) || 0 }))}
                  placeholder="Display order"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter image description (optional)"
                rows={3}
                className="resize-none"
              />
            </div>

            <div className="flex space-x-2">
              <Button
                onClick={editingImage ? handleUpdateImage : handleAddImage}
                className="btn-luxury"
              >
                <Save className="w-4 h-4 mr-2" />
                {editingImage ? 'Update Image' : 'Add Image'}
              </Button>
              <Button variant="outline" onClick={cancelEdit}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <Card key={image.id} className="overflow-hidden">
            <div className="aspect-video relative">
              <img
                src={image.image_url}
                alt={image.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 flex space-x-1">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => startEdit(image)}
                  className="bg-background/80 backdrop-blur-sm hover:bg-background/90"
                >
                  <Edit className="w-3 h-3" />
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="bg-destructive/80 backdrop-blur-sm hover:bg-destructive/90"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Image</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p>Are you sure you want to delete "{image.title}"? This action cannot be undone.</p>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline">Cancel</Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleDeleteImage(image.id)}
                        >
                          Delete Image
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <CardContent className="p-4">
              <h4 className="font-semibold text-sm mb-1">{image.title}</h4>
              {image.description && (
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                  {image.description}
                </p>
              )}
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span>Order: {image.sort_order}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  image.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {image.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {images.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Gallery Images</h3>
            <p className="text-muted-foreground mb-4">
              Start building your gallery by adding your first image.
            </p>
            <Button onClick={() => setIsAddingNew(true)} className="btn-luxury">
              <Upload className="w-4 h-4 mr-2" />
              Add First Image
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};