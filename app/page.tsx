import Timeline from "@/components/timeline"
import LearningSection from "@/components/learning-section"
import { timelineData } from "@/data/career-data"

export default function Home() {
  const profileInfo = {
    name: "Lim Sung Kang",
    title: "always curious and ready to help",
    profileImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/me2-uV7lNzY1oRKkBDbRIaZiWm5blVEnFT.png",
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-ghibli-cream to-ghibli-green/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Timeline timelineData={timelineData} profileInfo={profileInfo} />

        {/* Learning Section */}
        <LearningSection />
      </div>
    </main>
  )
}
