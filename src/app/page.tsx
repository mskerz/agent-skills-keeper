import Image from "next/image";
import { HeroSection, HowItWorkSection, PainPointSection } from "@/features/home"


export default function HomePage() {
  return (
    <div className="flex flex-col w-full min-h-screen ">
      <HeroSection />

      <PainPointSection />

      <HowItWorkSection/>




    </div>
  );
}
