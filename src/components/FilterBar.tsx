"use client"

import { FilterButton } from "@/components/FilterButton"
import {useState} from "react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {ChevronDown, X} from "lucide-react";

// 타입 정의
interface Tag { id: number; name: string; }
interface Position { id: number; name: string; }

interface FilterBarProps {
    // Position props
    allPositions: Position[]
    selectedPositionId: number | null
    onPositionChange: (id: number | null) => void
    // Stack(Tag) props
    allTags: Tag[]
    selectedTagIds: number[]
    onTagToggle: (id: number) => void
    onClearStacks: () => void
    // Recruit Status props
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

    // 가로 스크롤을 위한 공용 스타일
    const wrappingList = "flex w-full items-center gap-2 flex-wrap"    // 스크롤바 숨기기 (Tailwind 플러그인 필요)
    // className={`${scrollableList} scrollbar-hide`}
    const [isPositionOpen, setIsPositionOpen] = useState(true)
    const [isStacksOpen, setIsStacksOpen] = useState(true)

    return (
        <div className="w-full space-y-4">
            {/* Show Open Only Toggle */}
            <div className="flex items-center gap-3 pb-4 border-b border-border/20">
                <button
                    onClick={() => onShowOpenOnlyChange(!showOpenOnly)}
                    className={`
                        relative inline-flex h-6 w-11 items-center rounded-full
                        transition-colors duration-200 ease-in-out
                        focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2
                        ${showOpenOnly ? 'bg-green-500' : 'bg-muted'}
                    `}
                    role="switch"
                    aria-checked={showOpenOnly}
                >
                    <span
                        className={`
                            inline-block h-4 w-4 transform rounded-full bg-white
                            transition-transform duration-200 ease-in-out
                            ${showOpenOnly ? 'translate-x-6' : 'translate-x-1'}
                        `}
                    />
                </button>
                <span className="text-sm font-medium text-foreground">
                    Show Open Only
                </span>
            </div>
            {/* Position 필터 */}
            <Collapsible open={isPositionOpen} onOpenChange={setIsPositionOpen}>
                {/* 👇 Trigger가 텍스트와 화살표를 모두 감싸도록 변경 */}
                <CollapsibleTrigger asChild>
                {/* 👇 1. 부모 버튼에 'group' 클래스 추가 */}
                <button className="flex items-center gap-2 mb-3 text-sm font-semibold text-text/90 hover:text-text group">
                    <span>Position</span>
                    <ChevronDown
                        // 👇 2. 자식 아이콘에 'group-data-*' 사용
                        className="h-5 w-5 text-text/60 transition-transform duration-200 group-data-[state=open]:rotate-180"
                    />
                </button>
            </CollapsibleTrigger>

                <CollapsibleContent className={wrappingList}>
                    <FilterButton
                        onClick={() => onPositionChange(null)}
                        isActive={selectedPositionId === null}
                    >
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
                </CollapsibleContent>
            </Collapsible>

            {/* Stacks(Tags) 필터 */}
            <Collapsible open={isStacksOpen} onOpenChange={setIsStacksOpen}>
                {/* 👇 Trigger와 Clear 버튼을 분리하기 위해 flex-wrap 사용 */}
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 mb-3">
                    {/* 👇 Trigger가 텍스트와 화살표를 감쌈 */}
                    <CollapsibleTrigger asChild>
                        {/* 👇 1. 부모 버튼에 'group' 클래스 추가 */}
                        <button className="flex items-center gap-2 text-sm font-semibold text-text/90 hover:text-text group">
                            <span>Stacks</span>
                            <ChevronDown
                                // 👇 2. 자식 아이콘에 'group-data-*' 사용
                                className="h-5 w-5 text-text/60 transition-transform duration-200 group-data-[state=open]:rotate-180"
                            />
                        </button>
                    </CollapsibleTrigger>

                    {/* 👇 초기화 버튼 (열려있고, 선택된 태그가 있을 때만 보임) */}
                    {isStacksOpen && selectedTagIds.length > 0 && (
                        <button
                            onClick={onClearStacks}
                            className="flex items-center gap-1 text-xs text-text/50 hover:text-destructive transition-colors"
                        >
                            <X className="h-3 w-3" />
                            Clear Filter
                        </button>
                    )}
                </div>

                <CollapsibleContent className={wrappingList}>
                    {allTags.map(tag => (
                        <FilterButton
                            key={tag.id}
                            onClick={() => onTagToggle(tag.id)}
                            isActive={selectedTagIds.includes(tag.id)}
                        >
                            {tag.name}
                        </FilterButton>
                    ))}
                </CollapsibleContent>
            </Collapsible>
        </div>
    )
}