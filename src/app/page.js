import AboutAndEvents from "@/components/home/dummy/AboutAndEvent";
import AlumniSpotlight from "@/components/home/dummy/AlumniSpotlight";
import Gallery from "@/components/home/dummy/Gallery";
import HeroSection from "@/components/home/dummy/heroSection";
import TeamSection from "@/components/home/dummy/TeamSection";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      this is home page
      <HeroSection/>
      <AlumniSpotlight/>
      <TeamSection/>
      <AboutAndEvents/>
      <Gallery/>
    </div>
  );
}
