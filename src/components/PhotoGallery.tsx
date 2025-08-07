import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, Heart, Download } from "lucide-react";

const PhotoGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  // Placeholder for couple photos
  const photos = [
    { id: 1, url: "/placeholder.svg", caption: "Notre première rencontre" },
    { id: 2, url: "/placeholder.svg", caption: "Demande en mariage" },
    { id: 3, url: "/placeholder.svg", caption: "Nos fiançailles" },
    { id: 4, url: "/placeholder.svg", caption: "Préparatifs du mariage" },
    { id: 5, url: "/placeholder.svg", caption: "Séance engagement" },
    { id: 6, url: "/placeholder.svg", caption: "Notre amour" }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-muted/20 via-background to-muted/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 opacity-0 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Camera className="w-8 h-8 text-primary animate-float" />
            <h2 className="font-playfair text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Notre Histoire d'Amour
            </h2>
            <Camera className="w-8 h-8 text-secondary animate-float" style={{ animationDelay: '1s' }} />
          </div>
          <p className="font-cormorant text-xl text-muted-foreground italic max-w-2xl mx-auto">
            Chaque photo raconte un chapitre de notre belle histoire
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {photos.map((photo, index) => (
            <Card 
              key={photo.id} 
              className="group overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-xl transition-all duration-500 transform hover:scale-105 cursor-pointer opacity-0 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedPhoto(photo.id)}
            >
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={photo.url} 
                  alt={photo.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="font-dancing text-lg font-medium">{photo.caption}</p>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Heart className="w-6 h-6 text-white animate-romantic-pulse" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center opacity-0 animate-delayed-fade-in-2">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white font-medium px-8 py-6 text-lg rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Download className="w-5 h-5 mr-2" />
            Télécharger toutes les photos
          </Button>
          <p className="font-inter text-sm text-muted-foreground mt-4">
            Partagez vos plus beaux souvenirs avec nous
          </p>
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;