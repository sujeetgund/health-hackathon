// import Image from "next/image";

import ContentSection from "@/components/shared/ContentSection";
import CtaSection from "@/components/shared/CtaSection";
import FeatureSection from "@/components/shared/FeatureSection";
import HeroSection from "@/components/shared/HeroSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Feature Section */}
      <FeatureSection />

      {/* CTA Section */}
      <CtaSection />

      {/* Content Section */}
      <ContentSection />
    </div>
  );
}
