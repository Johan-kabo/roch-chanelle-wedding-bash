import { Heart, Star } from "lucide-react";

const FloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Floating Hearts */}
      <div className="absolute top-1/4 left-1/4 animate-float">
        <Heart className="w-8 h-8 text-secondary/20 animate-romantic-pulse" />
      </div>
      <div className="absolute top-3/4 right-1/4 animate-float" style={{ animationDelay: '1s' }}>
        <Heart className="w-6 h-6 text-primary/20 animate-romantic-pulse" />
      </div>
      <div className="absolute top-1/2 left-1/6 animate-float" style={{ animationDelay: '2s' }}>
        <Star className="w-5 h-5 text-secondary/15 animate-sparkle" />
      </div>
      <div className="absolute top-1/3 right-1/6 animate-float" style={{ animationDelay: '1.5s' }}>
        <Star className="w-7 h-7 text-primary/15 animate-sparkle" />
      </div>
      <div className="absolute bottom-1/4 left-1/3 animate-float" style={{ animationDelay: '0.5s' }}>
        <Heart className="w-4 h-4 text-secondary/25 animate-romantic-pulse" />
      </div>
      <div className="absolute bottom-1/3 right-1/3 animate-float" style={{ animationDelay: '2.5s' }}>
        <Star className="w-6 h-6 text-primary/20 animate-sparkle" />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-primary/8 to-secondary/8 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-20 w-24 h-24 bg-gradient-to-br from-secondary/12 to-primary/12 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-20 right-32 w-28 h-28 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
    </div>
  );
};

export default FloatingElements;