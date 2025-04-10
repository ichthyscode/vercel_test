export interface TimelineLink {
  title: string
  url: string
}

export interface TimelineItem {
  id: string
  title: string
  company: string
  startDate: string // ISO format: YYYY-MM-DD
  endDate?: string // ISO format: YYYY-MM-DD, undefined for current positions
  summary: string
  description?: string
  achievements?: string[]
  skills?: string[]
  links?: TimelineLink[]
  profileImage?: string // URL to profile image
}
