import { Card, CardContent } from "@/components/ui/card";
import { Clock, MapPin, Camera, Gift, Music, Utensils } from "lucide-react";

const WeddingDetails = () => {
  const details = [
    {
      icon: Clock,
      title: "Programme de la journée",
      items: [
        "14h00 - Accueil des invités",
        "14h30 - Cérémonie civile", 
        "15h30 - Cocktail & photos",
        "19h00 - Dîner & festivités",
        "23h00 - Soirée dansante"
      ]
    },
    {
      icon: MapPin,
      title: "Lieux de célébration",
      items: [
        "Mairie - Cérémonie civile",
        "Salle de réception - Cocktail",
        "Restaurant - Dîner",
        "Salle des fêtes - Soirée"
      ]
    },
    {
      icon: Utensils,
      title: "Menu du mariage",
      items: [
        "Cocktail de bienvenue",
        "Entrée raffinée",
        "Plat principal gastronomique", 
        "Dessert & pièce montée",
        "Bar ouvert toute la soirée"
      ]
    },
    {
      icon: Music,
      title: "Animations",
      items: [
        "Musique live pour la cérémonie",
        "DJ pour le cocktail",
        "Orchestre pour le dîner",
        "Piste de danse",
        "Photobooth surprise"
      ]
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-background to-accent/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Programme du Mariage
          </h2>
          <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez le déroulement de cette journée exceptionnelle que nous avons préparée pour vous
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {details.map((section, index) => {
            const Icon = section.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-wedding transition-all duration-500 transform hover:-translate-y-2 border-border/50 bg-card/80 backdrop-blur-sm"
              >
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-300">
                      <Icon className="w-8 h-8 text-primary group-hover:text-secondary transition-colors duration-300" />
                    </div>
                    <h3 className="font-playfair text-2xl font-semibold text-foreground">
                      {section.title}
                    </h3>
                  </div>
                  
                  <div className="space-y-3">
                    {section.items.map((item, itemIndex) => (
                      <div 
                        key={itemIndex}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors duration-200"
                      >
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary mt-2 flex-shrink-0" />
                        <span className="font-inter text-foreground/80 leading-relaxed">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Special Information Cards */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <Card className="border-2 border-secondary/30 bg-gradient-to-br from-secondary/5 to-primary/5">
            <CardContent className="p-8 text-center">
              <Gift className="w-12 h-12 mx-auto mb-4 text-secondary" />
              <h3 className="font-playfair text-2xl font-semibold mb-4 text-foreground">
                Liste de Mariage
              </h3>
              <p className="font-inter text-muted-foreground leading-relaxed">
                Votre présence est le plus beau des cadeaux. Si vous souhaitez nous gâter, 
                une liste de mariage est disponible ou une participation pour notre voyage de noces.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardContent className="p-8 text-center">
              <Camera className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="font-playfair text-2xl font-semibold mb-4 text-foreground">
                Partagez vos photos
              </h3>
              <p className="font-inter text-muted-foreground leading-relaxed">
                Immortalisez ces moments précieux et partagez vos plus belles photos 
                avec nous via notre album photo collaboratif en ligne.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WeddingDetails;