import { HeroSection, HowItWorkSection, PainPointSection, ExplorePreviewSection, ClosingCtaSection } from "@/features/home"


export default function HomePage() {
  return (
    <div data-snap-page className="flex flex-col w-full min-h-screen ">
      <HeroSection />


      <PainPointSection />

      <HowItWorkSection />

      <ExplorePreviewSection />

      <ClosingCtaSection />




    </div >
  );
}
