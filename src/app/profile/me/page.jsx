import ProfileCard from "@/components/profile/ProfileCard";
import ContactCard from "@/components/profile/ContactCard";
import RecordsCard from "@/components/profile/RecordsCard";
import ContributionSection from "@/components/profile/ContributionSection";
import PostsSection from "@/components/profile/PostsSection";
import SettingsCard from "@/components/profile/SettingsCard";
import "@/app/globals.css"; // Tailwind & reset

export default function ProfilePage() {
  return (
    <main className="bg-white min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4">
        <ProfileCard />
        <ContactCard />
        <RecordsCard />
        <ContributionSection />
        <PostsSection />
        <SettingsCard />
      </div>
    </main>
  );
}
