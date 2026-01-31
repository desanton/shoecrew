import { PromoBanner } from "@/components/layout/PromoBanner";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProductSection } from "@/components/sections/ProductSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";

export default function HomePage() {
  return (
    <main 
      className="flex flex-col items-center mx-auto bg-page-bg"
      style={{ 
        width: "1440px",
        maxWidth: "100%",
        gap: "112px"
      }}
    >
      <div className="w-full flex flex-col">
        <PromoBanner />
        <Header />
      </div>
      <HeroSection />
      <ProductSection />
      <FeaturesSection />
      <Footer />
    </main>
  );
}
