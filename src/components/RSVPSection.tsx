import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Heart, Send, Users } from "lucide-react";

const RSVPSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    guests: "1",
    attendance: "",
    dietary: [],
    message: ""
  });
  
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Confirmation reçue ! 💕",
      description: "Merci pour votre réponse. Nous avons hâte de célébrer avec vous !",
    });
  };

  const dietaryOptions = [
    { id: "vegetarian", label: "Végétarien" },
    { id: "vegan", label: "Végan" }, 
    { id: "gluten-free", label: "Sans gluten" },
    { id: "allergies", label: "Allergies spécifiques" }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-accent/20 via-background to-accent/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 opacity-0 animate-fade-in">
          <Heart className="w-16 h-16 mx-auto mb-6 text-secondary animate-romantic-pulse" />
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Confirmez votre présence
          </h2>
          <p className="font-cormorant text-xl text-muted-foreground max-w-2xl mx-auto italic">
            Nous serions ravis de vous compter parmi nous pour ce jour si spécial. 
            Merci de confirmer votre présence avant le <strong>5 août</strong>.
          </p>
        </div>

        <Card className="border-2 border-primary/20 shadow-elegant bg-card/80 backdrop-blur-sm opacity-0 animate-delayed-fade-in">
          <CardHeader className="text-center pb-6">
            <CardTitle className="font-playfair text-3xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Formulaire RSVP
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-inter font-medium text-foreground">
                    Nom complet *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="border-border/60 focus:border-primary"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-inter font-medium text-foreground">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="border-border/60 focus:border-primary"
                    required
                  />
                </div>
              </div>

              {/* Attendance Confirmation */}
              <div className="space-y-4">
                <Label className="font-inter font-medium text-foreground text-lg">
                  Confirmez-vous votre présence ? *
                </Label>
                <RadioGroup
                  value={formData.attendance}
                  onValueChange={(value) => setFormData({...formData, attendance: value})}
                  className="grid md:grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-border/60 hover:bg-accent/30 transition-colors">
                    <RadioGroupItem value="yes" id="yes" className="text-primary" />
                    <label htmlFor="yes" className="font-inter cursor-pointer flex-1">
                      Oui, je serai présent(e) ! 🎉
                    </label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-border/60 hover:bg-accent/30 transition-colors">
                    <RadioGroupItem value="no" id="no" className="text-primary" />
                    <label htmlFor="no" className="font-inter cursor-pointer flex-1">
                      Non, je ne pourrai pas venir 😔
                    </label>
                  </div>
                </RadioGroup>
              </div>

              {formData.attendance === "yes" && (
                <>
                  {/* Number of Guests */}
                  <div className="space-y-2">
                    <Label htmlFor="guests" className="font-inter font-medium text-foreground">
                      Nombre de personnes (vous inclus)
                    </Label>
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-primary" />
                      <Input
                        id="guests"
                        type="number"
                        min="1"
                        max="4"
                        value={formData.guests}
                        onChange={(e) => setFormData({...formData, guests: e.target.value})}
                        className="border-border/60 focus:border-primary max-w-24"
                      />
                      <span className="font-inter text-muted-foreground">personne(s)</span>
                    </div>
                  </div>

                  {/* Dietary Requirements */}
                  <div className="space-y-4">
                    <Label className="font-inter font-medium text-foreground">
                      Régimes alimentaires spéciaux
                    </Label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {dietaryOptions.map((option) => (
                        <div key={option.id} className="flex items-center space-x-3 p-3 rounded-lg border border-border/40 hover:bg-accent/20 transition-colors">
                          <Checkbox
                            id={option.id}
                            checked={formData.dietary.includes(option.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFormData({
                                  ...formData,
                                  dietary: [...formData.dietary, option.id]
                                });
                              } else {
                                setFormData({
                                  ...formData,
                                  dietary: formData.dietary.filter(item => item !== option.id)
                                });
                              }
                            }}
                            className="border-primary/60"
                          />
                          <label htmlFor={option.id} className="font-inter cursor-pointer flex-1">
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="font-inter font-medium text-foreground">
                  Message pour les mariés (optionnel)
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Vos vœux, félicitations ou demandes particulières..."
                  className="border-border/60 focus:border-primary min-h-[100px]"
                />
              </div>

              {/* Submit Button */}
              <div className="text-center pt-6">
                <Button
                  type="submit"
                  size="lg"
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white font-medium px-12 py-6 text-lg rounded-xl transition-all duration-300 transform hover:scale-105 shadow-wedding"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Envoyer ma réponse
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default RSVPSection;