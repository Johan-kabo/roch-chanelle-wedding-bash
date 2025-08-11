import WeddingHero from "@/components/WeddingHero";
import ThanksSection from "@/components/ThanksSection";
import MediaUploadSection from "@/components/MediaUploadSection";
import WeddingFooter from "@/components/WeddingFooter";
import FloatingElements from "@/components/FloatingElements";

const Index = () => {
  return (
    <div className="min-h-screen font-inter relative overflow-hidden">
      <FloatingElements />
      <WeddingHero />
      <ThanksSection />
      <MediaUploadSection />
      <WeddingFooter />
    </div>
  );
};

export default Index;
