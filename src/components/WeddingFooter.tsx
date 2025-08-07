import { Heart, Star, Calendar, MapPin } from "lucide-react";

const WeddingFooter = () => {
  return (
    <footer className="relative py-16 px-6 bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 border-t border-border/30">
      <div className="max-w-4xl mx-auto text-center">
        {/* Decorative Elements */}
        <div className="flex items-center justify-center gap-4 mb-8 opacity-0 animate-fade-in">
          <Star className="w-6 h-6 text-secondary animate-sparkle" />
          <Heart className="w-8 h-8 text-primary animate-romantic-pulse" />
          <Star className="w-6 h-6 text-secondary animate-sparkle" style={{ animationDelay: '1s' }} />
        </div>

        {/* Main Message */}
        <div className="mb-8 opacity-0 animate-delayed-fade-in">
          <h3 className="font-playfair text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Rochinel & Chanelle
          </h3>
          <p className="font-dancing text-xl md:text-2xl text-muted-foreground mb-4">
            "Deux cœurs, une destinée"
          </p>
          <p className="font-cormorant text-lg text-muted-foreground italic max-w-2xl mx-auto">
            Merci d'être présents pour célébrer le début de notre nouvelle aventure ensemble.
            Votre amour et votre soutien rendent ce jour encore plus spécial.
          </p>
        </div>

        {/* Quick Info */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-8 opacity-0 animate-delayed-fade-in-2">
          <div className="flex items-center gap-3 group">
            <Calendar className="w-5 h-5 text-primary group-hover:animate-float" />
            <span className="font-inter font-medium">Samedi 9 Août 2025</span>
          </div>
          <div className="flex items-center gap-3 group">
            <MapPin className="w-5 h-5 text-secondary group-hover:animate-float" />
            <span className="font-inter font-medium">Cérémonie à 14h00</span>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-border/20 opacity-0 animate-delayed-fade-in-3">
          <p className="font-inter text-sm text-muted-foreground">
            Site créé avec 💕 pour notre mariage
          </p>
          <p className="font-dancing text-lg text-primary/80 mt-2">
            #RochinelEtChanelle2025
          </p>
        </div>

        {/* Floating Hearts */}
        <div className="absolute top-4 left-1/4 animate-float">
          <Heart className="w-4 h-4 text-secondary/30" />
        </div>
        <div className="absolute bottom-4 right-1/4 animate-float" style={{ animationDelay: '2s' }}>
          <Heart className="w-5 h-5 text-primary/30" />
        </div>
      </div>
    </footer>
  );
};

export default WeddingFooter;