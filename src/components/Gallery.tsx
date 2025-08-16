import React, { useState, useEffect } from 'react';
import { X, ZoomIn, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { siteData } from '@/data/siteData.js';
import gallery1 from '@/assets/gallery-1.jpg';
import gallery2 from '@/assets/gallery-2.jpg';
import gallery3 from '@/assets/gallery-3.jpg';
import gallery4 from '@/assets/gallery-4.jpg';
import gallery5 from '@/assets/gallery-5.jpg';
import gallery6 from '@/assets/gallery-6.jpg';

const imageMap: Record<string, string> = {
  '/src/assets/gallery-1.jpg': gallery1,
  '/src/assets/gallery-2.jpg': gallery2,
  '/src/assets/gallery-3.jpg': gallery3,
  '/src/assets/gallery-4.jpg': gallery4,
  '/src/assets/gallery-5.jpg': gallery5,
  '/src/assets/gallery-6.jpg': gallery6,
};

export const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('All');
  const [visibleImages, setVisibleImages] = useState<number[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const categories = ['All', ...Array.from(new Set(siteData.gallery.images.map(img => img.category)))];

  const filteredImages = filter === 'All' 
    ? siteData.gallery.images 
    : siteData.gallery.images.filter(img => img.category === filter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const imageIndex = parseInt(entry.target.getAttribute('data-image-index') || '0');
            setVisibleImages((prev) => [...prev, imageIndex]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const images = document.querySelectorAll('[data-image-index]');
    images.forEach((image) => observer.observe(image));

    return () => observer.disconnect();
  }, [filteredImages]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? filteredImages.length - 1 : selectedImage - 1);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedImage !== null) {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') closeLightbox();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage]);

  return (
    <section id="gallery" className="py-20 bg-gradient-to-br from-muted/30 via-background to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 mb-6 bg-primary/10 rounded-full border border-primary/20">
            <ZoomIn className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm font-medium text-primary">Visual Experience</span>
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-foreground">
            {siteData.gallery.title}
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {siteData.gallery.subtitle}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category: string) => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(category)}
              className={`transition-all duration-300 ${
                filter === category 
                  ? 'btn-luxury' 
                  : 'btn-ghost-luxury hover:bg-primary/10'
              }`}
            >
              <Filter className="w-4 h-4 mr-2" />
              {category}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={`${image.src}-${index}`}
              data-image-index={index}
              className={`group relative overflow-hidden rounded-xl luxury-shadow cursor-pointer transform transition-all duration-700 hover-lift ${
                visibleImages.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              onClick={() => openLightbox(index)}
              style={{ 
                transitionDelay: `${index * 100}ms`,
                transform: `translateX(${mousePosition.x * 0.005}px) translateY(${mousePosition.y * 0.005}px)`
              }}
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src={imageMap[image.src] || image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-overlay opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
                
                {/* Category Badge */}
                <Badge className="absolute top-4 left-4 bg-white/10 backdrop-blur-md border-white/20 text-white">
                  {image.category}
                </Badge>
                
                {/* Zoom Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-md rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <ZoomIn className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                {/* Image Title */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translateY-full group-hover:translateY-0 transition-transform duration-300">
                  <h3 className="text-white font-semibold text-lg">{image.alt}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="relative max-w-6xl max-h-full">
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-md rounded-full p-2 text-white hover:bg-white/20 transition-colors duration-300"
              >
                <X className="w-6 h-6" />
              </button>
              
              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md rounded-full p-3 text-white hover:bg-white/20 transition-colors duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md rounded-full p-3 text-white hover:bg-white/20 transition-colors duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Image */}
              <img
                src={imageMap[filteredImages[selectedImage].src] || filteredImages[selectedImage].src}
                alt={filteredImages[selectedImage].alt}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              
              {/* Image Info */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-semibold text-lg">{filteredImages[selectedImage].alt}</h3>
                    <Badge className="mt-2 bg-primary/20 text-primary border-primary/30">
                      {filteredImages[selectedImage].category}
                    </Badge>
                  </div>
                  <div className="text-white/70 text-sm">
                    {selectedImage + 1} / {filteredImages.length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};