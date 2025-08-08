import { Clock, MapPin, Heart, Camera, Music, Utensils } from "lucide-react";

const Timeline = () => {
  const timelineEvents = [
    {
      time: "14:00",
      title: "Arrivée des invités",
      description: "Accueil et vin d'honneur",
      icon: Heart,
      color: "primary"
    },
    {
      time: "15:00",
      title: "Cérémonie",
      description: "Échange des vœux",
      icon: Heart,
      color: "secondary"
    },
    {
      time: "16:00",
      title: "Séance photos",
      description: "Immortalisons ce moment",
      icon: Camera,
      color: "primary"
    },
    {
      time: "18:00",
      title: "Cocktail",
      description: "Célébration avec nos proches",
      icon: Music,
      color: "secondary"
    },
    {
      time: "20:00",
      title: "Dîner",
      description: "Repas de fête",
      icon: Utensils,
      color: "primary"
    },
    {
      time: "22:00",
      title: "Soirée dansante",
      description: "Dansons jusqu'au bout de la nuit",
      icon: Music,
      color: "secondary"
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 opacity-0 animate-fade-in">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Programme de la journée
          </h2>
          <p className="font-cormorant text-xl text-muted-foreground italic">
            Une journée magique vous attend
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          {/* Timeline Line - Hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-secondary to-primary rounded-full opacity-30"></div>
          
          {timelineEvents.map((event, index) => {
            const Icon = event.icon;
            const isEven = index % 2 === 0;
            
            return (
              <div 
                key={index} 
                className={`relative flex items-center mb-8 md:mb-12 opacity-0 animate-fade-in`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Mobile Layout */}
                <div className="md:hidden w-full">
                  <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-inter font-semibold text-lg text-primary">
                        {event.time}
                      </span>
                    </div>
                    <h3 className="font-playfair text-xl font-semibold mb-2 text-foreground">
                      {event.title}
                    </h3>
                    <p className="font-inter text-muted-foreground text-sm">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className={`hidden md:block w-5/12 ${isEven ? 'text-right pr-8' : 'text-left pl-8 ml-auto'}`}>
                  <div className={`bg-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                    isEven ? 'mr-auto' : 'ml-auto'
                  }`}>
                    <div className="flex items-center gap-3 mb-3">
                      <Clock className="w-5 h-5 text-primary" />
                      <span className="font-inter font-semibold text-lg text-primary">
                        {event.time}
                      </span>
                    </div>
                    <h3 className="font-playfair text-xl font-semibold mb-2 text-foreground">
                      {event.title}
                    </h3>
                    <p className="font-inter text-muted-foreground">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* Timeline Icon - Desktop only */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full items-center justify-center shadow-lg animate-romantic-pulse">
                  <Icon className="w-8 h-8 text-white" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Timeline;