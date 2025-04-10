"use client"

import { useState } from "react"
import TimelineEntry from "./timeline-entry"
import FilterBar from "./filter-bar"
import ProfileHeader from "./profile-header"
import AddEntryModal from "./add-entry-modal"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { TimelineItem } from "@/types/timeline"
import { useToast } from "@/components/ui/use-toast"

interface TimelineProps {
  timelineData: TimelineItem[]
  profileInfo?: {
    name: string
    title: string
    profileImage: string
  }
}

export default function Timeline({
  timelineData,
  profileInfo = {
    name: "John Doe",
    title: "Software Engineer & Designer",
    profileImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/me2-uV7lNzY1oRKkBDbRIaZiWm5blVEnFT.png",
  },
}: TimelineProps) {
  const [filter, setFilter] = useState<string>("all")
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>(timelineData)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const { toast } = useToast()

  // Extract all unique skills/industries for filter options
  const allSkills = Array.from(new Set(timelineItems.flatMap((item) => (item.skills ? item.skills : []))))

  // Filter timeline items based on selected filter
  const filteredData =
    filter === "all" ? timelineItems : timelineItems.filter((item) => item.skills && item.skills.includes(filter))

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const handleUpdateItem = (id: string, updatedItem: Partial<TimelineItem>) => {
    setTimelineItems((items) => items.map((item) => (item.id === id ? { ...item, ...updatedItem } : item)))

    // Update filter options if skills have changed
    if (updatedItem.skills) {
      // If the current filter is no longer in the skills list, reset to 'all'
      if (filter !== "all" && !updatedItem.skills.includes(filter)) {
        setFilter("all")
      }
    }
  }

  const handleAddItem = (newItem: TimelineItem) => {
    // Add the new item to the beginning of the timeline
    setTimelineItems((items) => [newItem, ...items])

    // Show success toast
    toast({
      title: "Entry Added",
      description: `${newItem.title} at ${newItem.company} has been added to your timeline.`,
      duration: 3000,
    })

    // Expand the newly added item
    setExpandedId(newItem.id)
  }

  return (
    <div className="relative">
      {/* Profile Header */}
      <ProfileHeader name={profileInfo.name} title={profileInfo.title} profileImage={profileInfo.profileImage} />

      <FilterBar filters={["all", ...allSkills]} activeFilter={filter} onFilterChange={setFilter} />

      {filteredData.length === 0 ? (
        <div className="text-center py-10 text-slate-500">No entries match the selected filter.</div>
      ) : (
        <div className="relative">
          {/* Timeline vertical line */}
          <div
            className="absolute left-4 sm:left-1/2 sm:ml-[-1px] top-0 bottom-0 w-0.5 bg-ghibli-sand/50"
            aria-hidden="true"
          />

          <div className="space-y-12">
            {filteredData.map((item, index) => (
              <TimelineEntry
                key={item.id}
                item={item}
                isExpanded={expandedId === item.id}
                onToggle={() => toggleExpand(item.id)}
                isEven={index % 2 === 0}
                onUpdate={handleUpdateItem}
              />
            ))}
          </div>

          {/* Add button at the bottom of timeline */}
          <div className="flex justify-center mt-16 mb-8 relative">
            <div
              className="absolute left-4 sm:left-1/2 sm:ml-[-1px] top-[-3rem] h-12 w-0.5 bg-ghibli-sand/50"
              aria-hidden="true"
            />
            <Button
              onClick={() => setIsAddModalOpen(true)}
              size="lg"
              className="rounded-full h-14 w-14 shadow-lg bg-ghibli-blue hover:bg-ghibli-blue/90"
              aria-label="Add new timeline entry"
            >
              <Plus className="h-6 w-6" />
            </Button>
          </div>
        </div>
      )}

      {/* Add Entry Modal */}
      <AddEntryModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={handleAddItem} />
    </div>
  )
}
