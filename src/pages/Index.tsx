import WeddingHero from "@/components/WeddingHero";
import CountdownTimer from "@/components/CountdownTimer";
import Timeline from "@/components/Timeline";
import WeddingDetails from "@/components/WeddingDetails";
import PhotoGallery from "@/components/PhotoGallery";
import RSVPSection from "@/components/RSVPSection";
import WeddingFooter from "@/components/WeddingFooter";
import FloatingElements from "@/components/FloatingElements";

const Index = () => {
  return (
    <div className="min-h-screen font-inter relative overflow-hidden">
      <FloatingElements />
      <WeddingHero />
      <CountdownTimer />
      <Timeline />
      <WeddingDetails />
      <PhotoGallery />
      <RSVPSection />
      <WeddingFooter />
    </div>
  );
};

export default Index;
