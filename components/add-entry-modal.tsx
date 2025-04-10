"use client"

import type React from "react"

import { useState } from "react"
import { X, Plus, Calendar, Building } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import type { TimelineItem } from "@/types/timeline"

interface AddEntryModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (newEntry: TimelineItem) => void
}

export default function AddEntryModal({ isOpen, onClose, onAdd }: AddEntryModalProps) {
  const [newEntry, setNewEntry] = useState<Partial<TimelineItem>>({
    id: crypto.randomUUID(),
    title: "",
    company: "",
    startDate: new Date().toISOString().split("T")[0],
    summary: "",
    skills: [],
  })
  const [newSkill, setNewSkill] = useState("")
  const [newAchievement, setNewAchievement] = useState("")

  if (!isOpen) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewEntry((prev) => ({ ...prev, [name]: value }))
  }

  const handleSkillAdd = () => {
    if (newSkill.trim() === "") return
    setNewEntry((prev) => ({
      ...prev,
      skills: [...(prev.skills || []), newSkill.trim()],
    }))
    setNewSkill("")
  }

  const handleSkillRemove = (skillToRemove: string) => {
    setNewEntry((prev) => ({
      ...prev,
      skills: prev.skills?.filter((skill) => skill !== skillToRemove),
    }))
  }

  const handleAchievementAdd = () => {
    if (newAchievement.trim() === "") return
    setNewEntry((prev) => ({
      ...prev,
      achievements: [...(prev.achievements || []), newAchievement.trim()],
    }))
    setNewAchievement("")
  }

  const handleAchievementRemove = (index: number) => {
    setNewEntry((prev) => {
      const updatedAchievements = [...(prev.achievements || [])]
      updatedAchievements.splice(index, 1)
      return { ...prev, achievements: updatedAchievements }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    if (!newEntry.title || !newEntry.company || !newEntry.startDate || !newEntry.summary) {
      alert("Please fill in all required fields")
      return
    }

    // Add the new entry
    onAdd(newEntry as TimelineItem)

    // Reset form and close modal
    setNewEntry({
      id: crypto.randomUUID(),
      title: "",
      company: "",
      startDate: new Date().toISOString().split("T")[0],
      summary: "",
      skills: [],
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Add New Timeline Entry</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-slate-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-6 w-6 text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">
                Job Title <span className="text-red-500">*</span>
              </label>
              <Input
                id="title"
                name="title"
                value={newEntry.title}
                onChange={handleChange}
                required
                placeholder="e.g. Senior Software Engineer"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-1">
                Company <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center">
                <Building className="h-4 w-4 mr-2 text-slate-400" aria-hidden="true" />
                <Input
                  id="company"
                  name="company"
                  value={newEntry.company}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Tech Innovations Inc."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-slate-700 mb-1">
                  Start Date <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-slate-400" aria-hidden="true" />
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={newEntry.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-slate-700 mb-1">
                  End Date <span className="text-slate-500 text-xs">(leave empty for current position)</span>
                </label>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-slate-400" aria-hidden="true" />
                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={newEntry.endDate || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Summary and Description */}
          <div className="space-y-4">
            <div>
              <label htmlFor="summary" className="block text-sm font-medium text-slate-700 mb-1">
                Summary <span className="text-red-500">*</span>
              </label>
              <Textarea
                id="summary"
                name="summary"
                value={newEntry.summary}
                onChange={handleChange}
                required
                placeholder="Brief summary of your role"
                rows={2}
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={newEntry.description || ""}
                onChange={handleChange}
                placeholder="Detailed description of your responsibilities"
                rows={4}
              />
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Skills</label>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-1">
                {newEntry.skills?.map((skill) => (
                  <div key={skill} className="flex items-center bg-slate-100 text-xs rounded-full px-2 py-1">
                    <span>{skill}</span>
                    <button
                      type="button"
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
                  placeholder="Add skill (e.g. React, JavaScript)"
                  className="text-sm"
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleSkillAdd())}
                />
                <Button type="button" size="sm" variant="outline" onClick={handleSkillAdd}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Key Achievements</label>
            <div className="space-y-2">
              {newEntry.achievements?.map((achievement, i) => (
                <div key={i} className="flex gap-2">
                  <Textarea
                    value={achievement}
                    onChange={(e) => {
                      const updatedAchievements = [...(newEntry.achievements || [])]
                      updatedAchievements[i] = e.target.value
                      setNewEntry((prev) => ({ ...prev, achievements: updatedAchievements }))
                    }}
                    className="flex-1 text-sm"
                    rows={2}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-500 flex-shrink-0 self-start mt-1"
                    onClick={() => handleAchievementRemove(i)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              <div className="flex gap-2">
                <Textarea
                  value={newAchievement}
                  onChange={(e) => setNewAchievement(e.target.value)}
                  placeholder="Add an achievement"
                  className="flex-1 text-sm"
                  rows={2}
                />
                <Button
                  type="button"
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
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Entry</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
