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
          <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-text-shimmer bg-[length:200%_100%] opacity-0 animate-fade-in">
              Rochinel
            </span>
            <span className="block font-dancing text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-secondary my-4 md:my-6 opacity-0 animate-delayed-fade-in">
              &
            </span>
            <span className="bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent animate-text-shimmer bg-[length:200%_100%] opacity-0 animate-delayed-fade-in-2">
              Chanelle
            </span>
          </h1>
          <p className="font-cormorant text-lg sm:text-xl md:text-2xl text-foreground/80 mb-6 md:mb-8 opacity-0 animate-delayed-fade-in-3 italic px-4">
            Nous unissons nos cœurs ce samedi dans une célébration d'amour éternel
          </p>
        </div>

        {/* Wedding Details */}
        <div className="bg-card/90 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 mb-6 md:mb-8 border border-border/50 shadow-elegant opacity-0 animate-scale-in hover:shadow-2xl transition-all duration-500 mx-2">
          <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
              <div className="flex items-center gap-3 group">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-primary group-hover:animate-romantic-pulse" />
                <span className="font-inter font-medium text-sm sm:text-base md:text-lg">Samedi 9 Août 2025</span>
              </div>
              <div className="flex items-center gap-3 group">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-secondary group-hover:animate-float" />
                <span className="font-inter font-medium text-sm sm:text-base md:text-lg">Lieu à confirmer</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 sm:gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => {
                const rsvpSection = document.getElementById('rsvp-section');
                rsvpSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-primary-foreground font-medium px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 text-sm sm:text-base md:text-lg rounded-xl transition-all duration-300 transform hover:scale-105 shadow-wedding w-full sm:w-auto"
            >
              Confirmer ma présence
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => {
                const detailsSection = document.getElementById('wedding-details');
                detailsSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground font-medium px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 text-sm sm:text-base md:text-lg rounded-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
            >
              Voir les détails
            </Button>
          </div>
        </div>

        <div className="opacity-0 animate-delayed-fade-in-3 px-4">
          <p className="font-dancing text-lg sm:text-xl md:text-2xl text-foreground/70 mb-2">
            "L'amour ne consiste pas à se regarder l'un l'autre,"
          </p>
          <p className="font-dancing text-lg sm:text-xl md:text-2xl text-foreground/70">
            "mais à regarder ensemble dans la même direction"
          </p>
          <p className="font-cormorant text-sm sm:text-base md:text-lg text-muted-foreground mt-3 md:mt-4 italic">
            - Antoine de Saint-Exupéry
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-secondary/30 to-primary/30 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-xl animate-pulse delay-1000" />
    </section>
  );
};

export default WeddingHero;