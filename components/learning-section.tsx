"use client"

import type React from "react"

import { useState } from "react"
import { PlusCircle, Pencil, Save, X, ImageIcon, LinkIcon, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export interface LearningCard {
  id: string
  content: string
  images?: { url: string; alt: string }[]
  links?: { title: string; url: string }[]
}

interface LearningCardProps {
  card: LearningCard
  onUpdate: (id: string, updatedCard: Partial<LearningCard>) => void
  onDelete: (id: string) => void
}

function LearningCardComponent({ card, onUpdate, onDelete }: LearningCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedCard, setEditedCard] = useState<LearningCard>(card)
  const [newLink, setNewLink] = useState({ title: "", url: "" })
  const [newImage, setNewImage] = useState({ url: "", alt: "" })

  const handleSave = () => {
    onUpdate(card.id, editedCard)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedCard(card)
    setIsEditing(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditedCard((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddLink = () => {
    if (newLink.title.trim() === "" || newLink.url.trim() === "") return

    setEditedCard((prev) => ({
      ...prev,
      links: [...(prev.links || []), { ...newLink }],
    }))
    setNewLink({ title: "", url: "" })
  }

  const handleRemoveLink = (index: number) => {
    setEditedCard((prev) => {
      const updatedLinks = [...(prev.links || [])]
      updatedLinks.splice(index, 1)
      return { ...prev, links: updatedLinks }
    })
  }

  const handleAddImage = () => {
    if (newImage.url.trim() === "") return

    setEditedCard((prev) => ({
      ...prev,
      images: [...(prev.images || []), { ...newImage }],
    }))
    setNewImage({ url: "", alt: "" })
  }

  const handleRemoveImage = (index: number) => {
    setEditedCard((prev) => {
      const updatedImages = [...(prev.images || [])]
      updatedImages.splice(index, 1)
      return { ...prev, images: updatedImages }
    })
  }

  return (
    <Card className="bg-ghibli-cream border-ghibli-sand/30 shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div className="flex items-center gap-2">
          {isEditing ? (
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-green-600" onClick={handleSave}>
                <Save className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-600" onClick={handleCancel}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => setIsEditing(true)}>
              <Pencil className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-600" onClick={() => onDelete(card.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-4">
            <Textarea
              name="content"
              value={editedCard.content}
              onChange={handleChange}
              className="min-h-[100px]"
              placeholder="What have you learned recently?"
            />

            <div className="space-y-2">
              <h4 className="text-sm font-medium flex items-center">
                <ImageIcon className="h-4 w-4 mr-1" />
                Images
              </h4>
              {editedCard.images?.map((image, i) => (
                <div key={i} className="flex flex-col gap-2 p-2 border border-slate-200 rounded-md">
                  <div className="flex gap-2">
                    <Input
                      value={image.url}
                      onChange={(e) => {
                        const updatedImages = [...(editedCard.images || [])]
                        updatedImages[i] = { ...updatedImages[i], url: e.target.value }
                        setEditedCard((prev) => ({ ...prev, images: updatedImages }))
                      }}
                      placeholder="Image URL"
                      className="flex-1 text-sm"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500 flex-shrink-0"
                      onClick={() => handleRemoveImage(i)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <Input
                    value={image.alt}
                    onChange={(e) => {
                      const updatedImages = [...(editedCard.images || [])]
                      updatedImages[i] = { ...updatedImages[i], alt: e.target.value }
                      setEditedCard((prev) => ({ ...prev, images: updatedImages }))
                    }}
                    placeholder="Image description"
                    className="text-sm"
                  />
                </div>
              ))}
              <div className="flex flex-col gap-2 p-2 border border-slate-200 rounded-md">
                <Input
                  value={newImage.url}
                  onChange={(e) => setNewImage({ ...newImage, url: e.target.value })}
                  placeholder="Image URL"
                  className="text-sm"
                />
                <div className="flex gap-2">
                  <Input
                    value={newImage.alt}
                    onChange={(e) => setNewImage({ ...newImage, alt: e.target.value })}
                    placeholder="Image description"
                    className="flex-1 text-sm"
                  />
                  <Button variant="outline" size="sm" className="flex-shrink-0" onClick={handleAddImage}>
                    <PlusCircle className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium flex items-center">
                <LinkIcon className="h-4 w-4 mr-1" />
                Links
              </h4>
              {editedCard.links?.map((link, i) => (
                <div key={i} className="flex flex-col gap-2 p-2 border border-slate-200 rounded-md">
                  <div className="flex gap-2">
                    <Input
                      value={link.title}
                      onChange={(e) => {
                        const updatedLinks = [...(editedCard.links || [])]
                        updatedLinks[i] = { ...updatedLinks[i], title: e.target.value }
                        setEditedCard((prev) => ({ ...prev, links: updatedLinks }))
                      }}
                      placeholder="Link title"
                      className="flex-1 text-sm"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500 flex-shrink-0"
                      onClick={() => handleRemoveLink(i)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <Input
                    value={link.url}
                    onChange={(e) => {
                      const updatedLinks = [...(editedCard.links || [])]
                      updatedLinks[i] = { ...updatedLinks[i], url: e.target.value }
                      setEditedCard((prev) => ({ ...prev, links: updatedLinks }))
                    }}
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
                  <Button variant="outline" size="sm" className="flex-shrink-0" onClick={handleAddLink}>
                    <PlusCircle className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-sm text-slate-700 whitespace-pre-wrap">{card.content}</div>

            {editedCard.images && editedCard.images.length > 0 && (
              <div className="space-y-2">
                {editedCard.images.map((image, i) => (
                  <div key={i} className="rounded-md overflow-hidden">
                    <img src={image.url || "/placeholder.svg"} alt={image.alt} className="w-full h-auto" />
                  </div>
                ))}
              </div>
            )}

            {editedCard.links && editedCard.links.length > 0 && (
              <div className="space-y-2">
                {editedCard.links.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-ghibli-blue hover:underline"
                  >
                    <LinkIcon className="h-3 w-3 mr-1" />
                    {link.title}
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function LearningSection() {
  const [cards, setCards] = useState<LearningCard[]>([
    {
      id: "1",
      content:
        "I learned that with GenAI tools like v0 I can build education apps like math exercise app. I tried it out and tested on my 7 year old daughter who is in the 1st grade in school.",
      images: [],
      links: [
        {
          title: "Math Exercise App Example",
          url: "https://v0-math-app-0y5ect.vercel.app",
        },
      ],
    },
  ])

  const handleAddCard = () => {
    const newCard: LearningCard = {
      id: crypto.randomUUID(),
      content: "",
      images: [],
      links: [],
    }
    setCards((prev) => [...prev, newCard])
  }

  const handleUpdateCard = (id: string, updatedCard: Partial<LearningCard>) => {
    setCards((prev) => prev.map((card) => (card.id === id ? { ...card, ...updatedCard } : card)))
  }

  const handleDeleteCard = (id: string) => {
    setCards((prev) => prev.filter((card) => card.id !== id))
  }

  return (
    <div className="mt-16 mb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-ghibli-navy">What is something new that I have learned recently?</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {cards.map((card) => (
          <LearningCardComponent key={card.id} card={card} onUpdate={handleUpdateCard} onDelete={handleDeleteCard} />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Button onClick={handleAddCard} className="bg-ghibli-blue hover:bg-ghibli-blue/90">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Learning
        </Button>
      </div>
    </div>
  )
}
