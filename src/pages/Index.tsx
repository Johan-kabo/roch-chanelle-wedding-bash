import WeddingHero from "@/components/WeddingHero";
import WeddingDetails from "@/components/WeddingDetails";
import RSVPSection from "@/components/RSVPSection";

const Index = () => {
  return (
    <div className="min-h-screen font-inter">
      <WeddingHero />
      <WeddingDetails />
      <RSVPSection />
    </div>
  );
};

export default Index;
