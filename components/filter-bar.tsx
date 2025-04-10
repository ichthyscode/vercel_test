"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Filter, ChevronDown, ChevronUp } from "lucide-react"

interface FilterBarProps {
  filters: string[]
  activeFilter: string
  onFilterChange: (filter: string) => void
}

export default function FilterBar({ filters, activeFilter, onFilterChange }: FilterBarProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Always show "all" filter and active filter if it's not in the first 10
  const initialFilters = ["all"]
  const remainingFilters = filters.filter((f) => f !== "all")

  // If activeFilter is not "all" and not in the first 9 visible filters, add it to initial filters
  const activeFilterIndex = remainingFilters.indexOf(activeFilter)
  const shouldAddActiveFilter = activeFilter !== "all" && activeFilterIndex >= 9

  // Determine which filters to show based on expanded state
  const visibleFilters = isExpanded
    ? filters
    : [
        ...initialFilters,
        ...(shouldAddActiveFilter ? [activeFilter] : []),
        ...remainingFilters.slice(0, shouldAddActiveFilter ? 8 : 9),
      ]

  const hasMoreFilters = filters.length > visibleFilters.length

  return (
    <div className="mb-8">
      <div className="bg-ghibli-cream p-3 rounded-lg shadow-sm border border-ghibli-sand/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Filter className="h-4 w-4 text-ghibli-slate mr-1" aria-hidden="true" />
            <span className="text-sm font-medium text-ghibli-forest">Filter by:</span>
          </div>
          {hasMoreFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-ghibli-slate hover:text-ghibli-blue"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="h-3 w-3 mr-1" /> Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="h-3 w-3 mr-1" /> Show More ({filters.length - visibleFilters.length})
                </>
              )}
            </Button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {visibleFilters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterChange(filter)}
              className={`text-xs ${activeFilter === filter ? "bg-ghibli-blue hover:bg-ghibli-blue/90" : "border-ghibli-sand/50 hover:bg-ghibli-sand/10"}`}
              aria-pressed={activeFilter === filter}
            >
              {filter === "all" ? "All Experiences" : filter}
            </Button>
          ))}

          {isExpanded && (
            <div className="w-full flex justify-center mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsExpanded(false)}
                className="text-xs border-ghibli-sand/50 hover:bg-ghibli-sand/10"
              >
                <ChevronUp className="h-3 w-3 mr-1" /> Close Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
