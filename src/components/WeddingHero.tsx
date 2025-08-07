import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Heart } from "lucide-react";
import weddingHero from "@/assets/wedding-hero.jpg";

const WeddingHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={weddingHero} 
          alt="Rochinel & Chanelle Wedding" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/60 via-primary/20 to-secondary/40" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <Heart className="w-16 h-16 mx-auto mb-6 text-secondary animate-pulse" />
          <h1 className="font-playfair text-6xl md:text-8xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Rochinel
            </span>
            <span className="block font-inter text-2xl md:text-3xl font-light text-muted-foreground my-4">
              &
            </span>
            <span className="bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent">
              Chanelle
            </span>
          </h1>
          <p className="font-inter text-xl md:text-2xl text-foreground/80 mb-8">
            Nous unissons nos cœurs ce samedi
          </p>
        </div>

        {/* Wedding Details */}
        <div className="bg-card/80 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-border/50 shadow-elegant">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-6">
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-primary" />
              <span className="font-inter font-medium text-lg">Samedi 9 Août 2025</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-secondary" />
              <span className="font-inter font-medium text-lg">Cérémonie à venir</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-primary-foreground font-medium px-8 py-6 text-lg rounded-xl transition-all duration-300 transform hover:scale-105 shadow-wedding"
            >
              Confirmer ma présence
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground font-medium px-8 py-6 text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Voir les détails
            </Button>
          </div>
        </div>

        <p className="font-playfair text-lg text-foreground/70 italic">
          "L'amour ne consiste pas à se regarder l'un l'autre, mais à regarder ensemble dans la même direction"
        </p>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-secondary/30 to-primary/30 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-xl animate-pulse delay-1000" />
    </section>
  );
};

export default WeddingHero;