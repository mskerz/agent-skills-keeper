import { HeroSection, HowItWorkSection, PainPointSection, ExplorePreviewSection, SectionWrapper } from "@/features/home"


export default function HomePage() {
  return (
    <div data-snap-page className="flex flex-col w-full min-h-screen ">
      <HeroSection />


      <PainPointSection />

      <HowItWorkSection />

      <ExplorePreviewSection />



    </div >
  );
}
