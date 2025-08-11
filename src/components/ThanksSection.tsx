import { Heart, Users, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

const ThanksSection = () => {
  return (
    <section id="thanks-section" className="py-20 px-6 bg-gradient-to-br from-accent/20 via-background to-accent/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 opacity-0 animate-fade-in">
          <Heart className="w-16 h-16 mx-auto mb-6 text-secondary animate-romantic-pulse" />
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Merci du fond du cœur
          </h2>
          <p className="font-cormorant text-xl text-muted-foreground italic max-w-2xl mx-auto">
            Votre amour et votre soutien ont rendu notre journée inoubliable
          </p>
        </div>

        <div className="grid gap-8 md:gap-12">
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 opacity-0 animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <div className="text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="font-playfair text-2xl font-bold mb-4 text-foreground">
                À nos familles et amis
              </h3>
              <p className="font-cormorant text-lg text-muted-foreground leading-relaxed">
                Merci d'avoir voyagé de près ou de loin pour célébrer avec nous. Votre présence à nos côtés 
                a transformé cette journée en un moment magique que nous chérirons pour toujours. Chaque sourire, 
                chaque étreinte, chaque mot d'encouragement a ajouté une note de bonheur à notre symphonie d'amour.
              </p>
            </div>
          </Card>

          <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 opacity-0 animate-scale-in" style={{ animationDelay: '0.4s' }}>
            <div className="text-center">
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-secondary" />
              <h3 className="font-playfair text-2xl font-bold mb-4 text-foreground">
                Pour tous ces moments précieux
              </h3>
              <p className="font-cormorant text-lg text-muted-foreground leading-relaxed">
                Merci pour vos messages touchants, vos cadeaux généreux, et surtout pour avoir partagé notre joie. 
                Vous avez rendu cette célébration encore plus belle en y apportant votre propre lumière. 
                Nous sommes reconnaissants d'avoir des personnes aussi merveilleuses dans nos vies.
              </p>
            </div>
          </Card>

          <Card className="p-8 bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm border-border/50 opacity-0 animate-scale-in" style={{ animationDelay: '0.6s' }}>
            <div className="text-center">
              <div className="flex justify-center items-center gap-4 mb-6">
                <Heart className="w-8 h-8 text-primary animate-romantic-pulse" />
                <div className="font-dancing text-3xl text-primary">
                  Rochinel & Chanelle
                </div>
                <Heart className="w-8 h-8 text-secondary animate-romantic-pulse" style={{ animationDelay: '1s' }} />
              </div>
              <p className="font-cormorant text-xl text-foreground font-medium italic">
                "L'amour que vous nous avez témoigné continuera de nous porter tout au long de notre vie ensemble. 
                Merci de faire partie de notre histoire d'amour."
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ThanksSection;