"use client"
import { motion, AnimatePresence } from "framer-motion"
import type React from "react"
import { useState } from "react"
import {
  ChevronDown,
  ChevronUp,
  Calendar,
  Building,
  Award,
  Pencil,
  Save,
  X,
  Plus,
  Trash2,
  LinkIcon,
  Globe,
} from "lucide-react"
import type { TimelineItem, TimelineLink } from "@/types/timeline"
import { formatDateRange } from "@/lib/date-utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface TimelineEntryProps {
  item: TimelineItem
  isExpanded: boolean
  onToggle: () => void
  isEven: boolean
  onUpdate?: (id: string, updatedItem: Partial<TimelineItem>) => void
}

export default function TimelineEntry({ item, isExpanded, onToggle, isEven, onUpdate }: TimelineEntryProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedItem, setEditedItem] = useState<TimelineItem>(item)
  const [newSkill, setNewSkill] = useState("")
  const [newAchievement, setNewAchievement] = useState("")
  const [newLink, setNewLink] = useState<TimelineLink>({ title: "", url: "" })

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsEditing(true)
  }

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(item.id, editedItem)
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedItem(item)
    setIsEditing(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditedItem((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditedItem((prev) => ({ ...prev, [name]: value }))
  }

  const handleSkillAdd = () => {
    if (newSkill.trim() === "") return

    setEditedItem((prev) => ({
      ...prev,
      skills: [...(prev.skills || []), newSkill.trim()],
    }))
    setNewSkill("")
  }

  const handleSkillRemove = (skillToRemove: string) => {
    setEditedItem((prev) => ({
      ...prev,
      skills: prev.skills?.filter((skill) => skill !== skillToRemove),
    }))
  }

  const handleAchievementAdd = () => {
    if (newAchievement.trim() === "") return

    setEditedItem((prev) => ({
      ...prev,
      achievements: [...(prev.achievements || []), newAchievement.trim()],
    }))
    setNewAchievement("")
  }

  const handleAchievementChange = (index: number, value: string) => {
    setEditedItem((prev) => {
      const updatedAchievements = [...(prev.achievements || [])]
      updatedAchievements[index] = value
      return { ...prev, achievements: updatedAchievements }
    })
  }

  const handleAchievementRemove = (index: number) => {
    setEditedItem((prev) => {
      const updatedAchievements = [...(prev.achievements || [])]
      updatedAchievements.splice(index, 1)
      return { ...prev, achievements: updatedAchievements }
    })
  }

  const handleLinkAdd = () => {
    if (newLink.title.trim() === "" || newLink.url.trim() === "") return

    setEditedItem((prev) => ({
      ...prev,
      links: [...(prev.links || []), { ...newLink }],
    }))
    setNewLink({ title: "", url: "" })
  }

  const handleLinkChange = (index: number, field: keyof TimelineLink, value: string) => {
    setEditedItem((prev) => {
      const updatedLinks = [...(prev.links || [])]
      updatedLinks[index] = { ...updatedLinks[index], [field]: value }
      return { ...prev, links: updatedLinks }
    })
  }

  const handleLinkRemove = (index: number) => {
    setEditedItem((prev) => {
      const updatedLinks = [...(prev.links || [])]
      updatedLinks.splice(index, 1)
      return { ...prev, links: updatedLinks }
    })
  }

  // Function to extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string): string | null => {
    try {
      if (url.includes("youtube.com/watch")) {
        return new URL(url).searchParams.get("v")
      } else if (url.includes("youtu.be/")) {
        return url.split("youtu.be/")[1]?.split("?")[0] || null
      } else if (url.includes("youtube.com/embed/")) {
        return url.split("youtube.com/embed/")[1]?.split("?")[0] || null
      }
    } catch (error) {
      console.error("Error parsing YouTube URL:", error)
    }
    return null
  }

  // Function to get website domain from URL
  const getDomainFromUrl = (url: string): string => {
    try {
      const domain = new URL(url).hostname
      return domain.replace("www.", "")
    } catch (error) {
      return url
    }
  }

  // Render links and thumbnails
  const renderLinksAndThumbnails = () => {
    if (!editedItem.links || editedItem.links.length === 0) return null

    return (
      <ul className="mt-3 space-y-3">
        {editedItem.links.map((link, i) => {
          const videoId = getYouTubeVideoId(link.url)
          const isYouTube = !!videoId
          const domain = getDomainFromUrl(link.url)

          return (
            <li key={i} className="flex flex-col">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-ghibli-blue font-medium hover:underline flex items-center"
              >
                <LinkIcon className="h-3 w-3 mr-1 flex-shrink-0" />
                {link.title}
              </a>

              {isYouTube ? (
                <div className="mt-2 w-full">
                  <div className="aspect-video w-full max-w-md rounded-md overflow-hidden border border-slate-200">
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title={link.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                </div>
              ) : (
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="mt-2 block">
                  <div className="flex items-center p-3 bg-slate-50 border border-slate-200 rounded-md hover:bg-slate-100 transition-colors max-w-md">
                    <div className="w-12 h-12 bg-white rounded-md border border-slate-200 flex items-center justify-center flex-shrink-0 mr-3 overflow-hidden">
                      <img
                        src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
                        alt={`${domain} favicon`}
                        className="w-6 h-6"
                        onError={(e) => {
                          // If favicon fails to load, show a globe icon
                          e.currentTarget.style.display = "none"
                          e.currentTarget.parentElement?.classList.add("fallback-icon")
                        }}
                      />
                      <Globe className="h-6 w-6 text-slate-400 hidden fallback-icon" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-slate-900 truncate">{link.title}</p>
                      <p className="text-xs text-slate-500 truncate">{domain}</p>
                    </div>
                  </div>
                </a>
              )}
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <div className={`relative flex flex-col sm:flex-row ${isEven ? "sm:flex-row-reverse" : ""}`}>
      {/* Timeline dot */}
      <div
        className="absolute left-4 sm:left-1/2 sm:ml-[-8px] top-1/2 sm:top-12 -translate-y-1/2 w-4 h-4 rounded-full bg-ghibli-blue border-4 border-ghibli-cream shadow"
        aria-hidden="true"
      />

      {/* Date section - always visible */}
      <div className={`sm:w-1/2 ${isEven ? "sm:pl-12" : "sm:pr-12"} pb-2 sm:pb-0 flex items-center sm:h-24`}>
        <div className={`${isEven ? "text-left" : "text-right"} pl-10 sm:pl-0 w-full`}>
          {isEditing ? (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <label className="text-xs text-slate-500">Start Date:</label>
                <Input
                  type="date"
                  name="startDate"
                  value={editedItem.startDate}
                  onChange={handleDateChange}
                  className="h-7 text-xs"
                />
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <label className="text-xs text-slate-500">End Date:</label>
                <Input
                  type="date"
                  name="endDate"
                  value={editedItem.endDate || ""}
                  onChange={handleDateChange}
                  className="h-7 text-xs"
                  placeholder="Leave empty for current position"
                />
              </div>
            </div>
          ) : (
            <span className="inline-flex items-center text-sm font-medium text-slate-500">
              <Calendar className="h-4 w-4 mr-1" aria-hidden="true" />
              <time dateTime={`${item.startDate}/${item.endDate || "present"}`}>
                {formatDateRange(item.startDate, item.endDate)}
              </time>
            </span>
          )}
        </div>
      </div>

      {/* Content section */}
      <div className={`sm:w-1/2 ${isEven ? "sm:pr-12" : "sm:pl-12"} pl-10 sm:pl-0`}>
        <div
          className={`bg-ghibli-cream p-4 rounded-lg shadow-sm border border-ghibli-sand/30 ${isExpanded ? "ring-2 ring-ghibli-blue/30" : ""}`}
        >
          <div className="flex justify-between items-start">
            <div className="w-full pr-8">
              {isEditing ? (
                <Input
                  type="text"
                  name="title"
                  value={editedItem.title}
                  onChange={handleChange}
                  className="text-lg font-semibold text-slate-900 mb-1"
                />
              ) : (
                <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              )}
              <div className="flex items-center text-slate-600 text-sm mt-1">
                <Building className="h-4 w-4 mr-1" aria-hidden="true" />
                {isEditing ? (
                  <Input
                    type="text"
                    name="company"
                    value={editedItem.company}
                    onChange={handleChange}
                    className="h-7 text-sm"
                  />
                ) : (
                  <span>{item.company}</span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1 bg-ghibli-green/20 p-1.5 rounded-lg border border-ghibli-green/30 shadow-sm hover:bg-ghibli-green/30 transition-colors">
              {onUpdate && (
                <>
                  {isEditing ? (
                    <div className="flex gap-1">
                      <button
                        onClick={handleSave}
                        className="p-1 rounded-full hover:bg-green-100 transition-colors text-green-600"
                        aria-label="Save changes"
                      >
                        <Save className="h-5 w-5" />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="p-1 rounded-full hover:bg-red-100 transition-colors text-red-600"
                        aria-label="Cancel editing"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleEdit}
                      className="p-1 rounded-full hover:bg-slate-100 transition-colors mr-1"
                      aria-label="Edit entry"
                    >
                      <Pencil className="h-4 w-4 text-slate-500" />
                    </button>
                  )}
                </>
              )}
              <button
                onClick={onToggle}
                className="p-1 rounded-full hover:bg-slate-100 transition-colors"
                aria-expanded={isExpanded}
                aria-controls={`details-${item.id}`}
                aria-label={isExpanded ? "Collapse details" : "Expand details"}
              >
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 text-slate-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-slate-500" />
                )}
              </button>
            </div>
          </div>

          {/* Description - always visible */}
          {isEditing ? (
            <Textarea
              name="description"
              value={editedItem.description || ""}
              onChange={handleChange}
              className="mt-2 text-slate-600 w-full"
              placeholder="Add a description"
              rows={4}
            />
          ) : (
            editedItem.description && <p className="mt-2 text-sm text-slate-600">{editedItem.description}</p>
          )}

          {/* Skills tags - always visible */}
          <div className="mt-3">
            {isEditing ? (
              <div className="space-y-2">
                <div className="flex flex-wrap gap-1">
                  {editedItem.skills?.map((skill) => (
                    <div key={skill} className="flex items-center bg-slate-100 text-xs rounded-full px-2 py-1">
                      <span>{skill}</span>
                      <button
                        onClick={() => handleSkillRemove(skill)}
                        className="ml-1 text-slate-400 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add skill"
                    className="h-7 text-xs"
                    onKeyDown={(e) => e.key === "Enter" && handleSkillAdd()}
                  />
                  <Button size="sm" variant="outline" className="h-7 px-2 text-xs" onClick={handleSkillAdd}>
                    <Plus className="h-3 w-3 mr-1" />
                    Add
                  </Button>
                </div>
              </div>
            ) : (
              editedItem.skills &&
              editedItem.skills.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {editedItem.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              )
            )}
          </div>

          {/* Links and thumbnails - always visible */}
          {isEditing ? (
            <div className="mt-4 space-y-3">
              <h4 className="text-sm font-medium text-slate-900 flex items-center">
                <LinkIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                Related Links
              </h4>
              {editedItem.links?.map((link, i) => (
                <div key={i} className="flex flex-col gap-2 p-2 border border-slate-200 rounded-md">
                  <div className="flex gap-2">
                    <Input
                      value={link.title}
                      onChange={(e) => handleLinkChange(i, "title", e.target.value)}
                      placeholder="Link title"
                      className="flex-1 text-sm"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500 flex-shrink-0"
                      onClick={() => handleLinkRemove(i)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <Input
                    value={link.url}
                    onChange={(e) => handleLinkChange(i, "url", e.target.value)}
                    placeholder="https://example.com"
                    className="text-sm"
                  />
                </div>
              ))}

              <div className="flex flex-col gap-2 p-2 border border-slate-200 rounded-md">
                <Input
                  value={newLink.title}
                  onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                  placeholder="Link title"
                  className="text-sm"
                />
                <div className="flex gap-2">
                  <Input
                    value={newLink.url}
                    onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                    placeholder="https://example.com"
                    className="flex-1 text-sm"
                  />
                  <Button variant="outline" size="sm" className="flex-shrink-0" onClick={handleLinkAdd}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            renderLinksAndThumbnails()
          )}

          {/* Expandable details */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                id={`details-${item.id}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="border-t border-slate-200 mt-4 pt-4">
                  {/* Achievements - only visible when expanded */}
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-slate-900 flex items-center">
                      <Award className="h-4 w-4 mr-1" aria-hidden="true" />
                      Key Achievements
                    </h4>

                    {isEditing ? (
                      <div className="mt-2 space-y-2">
                        {editedItem.achievements?.map((achievement, i) => (
                          <div key={i} className="flex gap-2">
                            <Textarea
                              value={achievement}
                              onChange={(e) => handleAchievementChange(i, e.target.value)}
                              className="flex-1 text-sm"
                              rows={2}
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-500 flex-shrink-0 self-start mt-1"
                              onClick={() => handleAchievementRemove(i)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}

                        <div className="flex gap-2 mt-2">
                          <Textarea
                            value={newAchievement}
                            onChange={(e) => setNewAchievement(e.target.value)}
                            placeholder="Add new achievement"
                            className="flex-1 text-sm"
                            rows={2}
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 flex-shrink-0 self-start mt-1"
                            onClick={handleAchievementAdd}
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Add
                          </Button>
                        </div>
                      </div>
                    ) : (
                      editedItem.achievements &&
                      editedItem.achievements.length > 0 && (
                        <ul className="mt-2 space-y-2 text-sm text-slate-600">
                          {editedItem.achievements.map((achievement, i) => (
                            <li key={i} className="flex">
                              <span className="mr-2">•</span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      )
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
