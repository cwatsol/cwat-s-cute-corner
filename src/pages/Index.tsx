import HeroSection from "@/components/HeroSection";
import Tokenomics from "@/components/Tokenomics";
import PfpGenerator from "@/components/PfpGenerator";
import AboutSection from "@/components/AboutSection";
import HowToBuy from "@/components/HowToBuy";
import FloatingSocials from "@/components/FloatingSocials";

const Index = () => {
  return (
    <div className="grain-bg min-h-screen">
      <HeroSection />
      <Tokenomics />
      <PfpGenerator />
      <AboutSection />
      <HowToBuy />
      <FloatingSocials />
      <footer className="py-8 text-center font-body text-sm text-muted-foreground">
        $CWAT is a memecoin with no intrinsic value. DYOR. 🐱
      </footer>
    </div>
  );
};

export default Index;
