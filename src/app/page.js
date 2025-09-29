
import AlumniSpotlight from "@/components/home/AlumniSpotlight";
import Gallery from "@/components/home/GalleryComponent";
import Image from "next/image";
import Hero from "@/components/home/Hero";
import RecentEvents from "@/components/home/RecentEvents";
import AlumniDirectory from "@/components/home/AlumniDirectory";
import Community from "@/components/home/CommunityPost";
import ChairmanMessage from "@/components/home/MessageBox";
import ProfileAndConnectCard from "@/components/home/ProfileAndConnectCard";
import Warning from "@/components/Warning";

export default function Home() {
  return (
    <div>
      <Warning/>
      <Hero/>
      <div className="bg-gray-800 py-12">
        <ProfileAndConnectCard/>
      </div>
      
      <AlumniSpotlight/>
      <AlumniDirectory/>
      <RecentEvents/>
      <Community/>
      <Gallery/>
      <ChairmanMessage/>


    </div>
  );
}
