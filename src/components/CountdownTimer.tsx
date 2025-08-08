import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const weddingDate = new Date('2025-08-09T14:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'Jours', value: timeLeft.days, color: 'primary' },
    { label: 'Heures', value: timeLeft.hours, color: 'secondary' },
    { label: 'Minutes', value: timeLeft.minutes, color: 'primary' },
    { label: 'Secondes', value: timeLeft.seconds, color: 'secondary' }
  ];

  return (
    <section className="py-16 px-6 bg-gradient-to-r from-primary/5 via-background to-secondary/5">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-12 opacity-0 animate-fade-in">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Plus que...
          </h2>
          <p className="font-dancing text-xl text-muted-foreground">
            avant le plus beau jour de notre vie
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-8">
          {timeUnits.map((unit, index) => (
            <Card 
              key={unit.label}
              className={`p-3 sm:p-4 md:p-6 text-center bg-card/80 backdrop-blur-sm border-2 ${
                unit.color === 'primary' ? 'border-primary/30' : 'border-secondary/30'
              } hover:shadow-lg transition-all duration-300 transform hover:scale-105 opacity-0 animate-scale-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`text-2xl sm:text-3xl md:text-4xl font-bold font-playfair mb-1 sm:mb-2 ${
                unit.color === 'primary' ? 'text-primary' : 'text-secondary'
              }`}>
                {unit.value.toString().padStart(2, '0')}
              </div>
              <div className="text-xs sm:text-sm md:text-base font-inter text-muted-foreground uppercase tracking-wider">
                {unit.label}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountdownTimer;