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

    // 라벨 공통 스타일
    const labelStyle = "w-32 pt-1.5 flex-shrink-0 text-sm font-bold text-foreground/70 uppercase tracking-wider";

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="w-full border border-border/20 rounded-lg overflow-hidden bg-background"
        >
            {/* 상단 컨트롤 바: 항상 노출됨 */}
            <div className="flex items-center justify-between px-6 py-4 bg-background">
                <div className="flex items-center gap-4">
                    <CollapsibleTrigger asChild>
                        <button className="flex items-center gap-2 text-sm font-semibold hover:text-primary transition-colors group">
                            <SlidersHorizontal className="h-4 w-4" />
                            <span>Filters</span>
                            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                    </CollapsibleTrigger>

                    {/* 선택된 필터가 있을 때 보여주는 요약 정보 (선택 사항) */}
                    {(selectedPositionId || selectedTagIds.length > 0 || showOpenOnly) && !isOpen && (
                        <div className="flex items-center gap-2">
                            <span className="h-4 w-[1px] bg-border mx-2" />
                            <span className="text-xs text-muted-foreground">
                                Active filters: { (showOpenOnly ? 1 : 0) + (selectedPositionId ? 1 : 0) + selectedTagIds.length }
                            </span>
                        </div>
                    )}
                </div>

                {/* 필터 전체 초기화 버튼 */}
                {(selectedPositionId || selectedTagIds.length > 0 || showOpenOnly) && (
                    <button
                        onClick={() => {
                            onPositionChange(null);
                            if (showOpenOnly) onShowOpenOnlyChange(false);
                            onClearStacks();
                        }}
                        className="text-xs font-medium text-muted-foreground hover:text-destructive flex items-center gap-1"
                    >
                        <X className="h-3 w-3" />
                        Reset All
                    </button>
                )}
            </div>

            {/* 접히는 필터 내용 */}
            <CollapsibleContent className="px-6 pb-6 space-y-6 animate-in fade-in slide-in-from-top-2">
                <div className="h-[1px] bg-border/20 w-full mb-6" />

                {/* 1. Recruit Status */}
                <div className="flex items-start gap-4">
                    <div className={labelStyle}>Status</div>
                    <div className="flex flex-wrap items-center gap-2">
                        <FilterButton
                            onClick={() => onShowOpenOnlyChange(false)}
                            isActive={!showOpenOnly}
                        >
                            All Posts
                        </FilterButton>
                        <FilterButton
                            onClick={() => onShowOpenOnlyChange(true)}
                            isActive={showOpenOnly}
                        >
                            Show Open Only
                        </FilterButton>
                    </div>
                </div>

                {/* 2. Position */}
                <div className="flex items-start gap-4">
                    <div className={labelStyle}>Position</div>
                    <div className="flex flex-wrap items-center gap-2">
                        <FilterButton
                            onClick={() => onPositionChange(null)}
                            isActive={selectedPositionId === null}
                        >
                            All Positions
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

                {/* 3. Stacks */}
                <div className="flex items-start gap-4">
                    <div className={labelStyle}>Stacks</div>
                    <div className="flex flex-wrap items-center gap-2">
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