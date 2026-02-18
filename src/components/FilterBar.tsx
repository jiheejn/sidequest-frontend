"use client"

import { useState } from "react";
import { FilterButton } from "@/components/FilterButton"
import { SlidersHorizontal, ChevronDown, X } from "lucide-react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"

interface Tag { id: number; name: string; }
interface Position { id: number; name: string; }

interface FilterBarProps {
    allPositions: Position[]
    selectedPositionId: number | null
    onPositionChange: (id: number | null) => void
    allTags: Tag[]
    selectedTagIds: number[]
    onTagToggle: (id: number) => void
    onClearStacks: () => void
    showOpenOnly: boolean
    onShowOpenOnlyChange: (value: boolean) => void
}

export function FilterBar({
                              allPositions,
                              selectedPositionId,
                              onPositionChange,
                              allTags,
                              selectedTagIds,
                              onTagToggle,
                              onClearStacks,
                              showOpenOnly,
                              onShowOpenOnlyChange
                          }: FilterBarProps) {
    const [isOpen, setIsOpen] = useState(false);

    const labelStyle = "w-28 pt-0.5 flex-shrink-0 text-xs font-medium text-muted-foreground";

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="w-full border border-border rounded-xl overflow-hidden bg-card"
        >
            <div className="flex items-center justify-between px-5 py-3">
                <div className="flex items-center gap-4">
                    <CollapsibleTrigger asChild>
                        <button className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent-foreground transition-colors">
                            <SlidersHorizontal className="h-4 w-4" />
                            <span>Filters</span>
                            <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                    </CollapsibleTrigger>

                    {(selectedPositionId || selectedTagIds.length > 0 || showOpenOnly) && !isOpen && (
                        <div className="flex items-center gap-2">
                            <span className="h-4 w-px bg-border" />
                            <span className="text-xs text-muted-foreground">
                                {(showOpenOnly ? 1 : 0) + (selectedPositionId ? 1 : 0) + selectedTagIds.length} active
                            </span>
                        </div>
                    )}
                </div>

                {(selectedPositionId || selectedTagIds.length > 0 || showOpenOnly) && (
                    <button
                        onClick={() => {
                            onPositionChange(null);
                            if (showOpenOnly) onShowOpenOnlyChange(false);
                            onClearStacks();
                        }}
                        className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1 transition-colors"
                    >
                        <X className="h-3 w-3" />
                        Reset
                    </button>
                )}
            </div>

            <CollapsibleContent className="px-5 pb-5 space-y-4 animate-in fade-in slide-in-from-top-2">
                <div className="h-px bg-border w-full" />

                <div className="flex items-start gap-4">
                    <div className={labelStyle}>Status</div>
                    <div className="flex flex-wrap items-center gap-1.5">
                        <FilterButton onClick={() => onShowOpenOnlyChange(false)} isActive={!showOpenOnly}>
                            All
                        </FilterButton>
                        <FilterButton onClick={() => onShowOpenOnlyChange(true)} isActive={showOpenOnly}>
                            Open Only
                        </FilterButton>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className={labelStyle}>Position</div>
                    <div className="flex flex-wrap items-center gap-1.5">
                        <FilterButton onClick={() => onPositionChange(null)} isActive={selectedPositionId === null}>
                            All
                        </FilterButton>
                        {allPositions.map(pos => (
                            <FilterButton
                                key={pos.id}
                                onClick={() => onPositionChange(pos.id)}
                                isActive={selectedPositionId === pos.id}
                            >
                                {pos.name}
                            </FilterButton>
                        ))}
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className={labelStyle}>Stacks</div>
                    <div className="flex flex-wrap items-center gap-1.5">
                        {allTags.map(tag => (
                            <FilterButton
                                key={tag.id}
                                onClick={() => onTagToggle(tag.id)}
                                isActive={selectedTagIds.includes(tag.id)}
                            >
                                {tag.name}
                            </FilterButton>
                        ))}
                    </div>
                </div>
            </CollapsibleContent>
        </Collapsible>
    )
}
