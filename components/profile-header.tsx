import Image from "next/image"

interface ProfileHeaderProps {
  name: string
  title: string
  profileImage: string
}

export default function ProfileHeader({ name, title, profileImage }: ProfileHeaderProps) {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40">
        <Image
          src={profileImage || "/placeholder.svg"}
          alt={`Profile picture of ${name}`}
          fill
          priority
          className="rounded-full object-cover border-4 border-ghibli-cream shadow-md"
        />
      </div>
      <h2 className="mt-4 text-2xl font-bold text-ghibli-navy">{name}</h2>
      <p className="text-ghibli-slate">{title}</p>
    </div>
  )
}
