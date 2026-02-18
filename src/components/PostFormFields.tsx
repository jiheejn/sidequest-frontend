"use client"

import { Input } from "@/components/ui/input"
import { FilterButton } from "@/components/FilterButton"
import { RichTextEditor } from "@/components/editor/RichTextEditor"
import type { Tag, Position } from "@/hooks/usePostFormData"

interface PostFormFieldsProps {
    title: string
    content: string
    recruitStatus: string
    selectedPositionId: number | null
    selectedTags: number[]
    positions: Position[]
    tags: Tag[]
    onTitleChange: (title: string) => void
    onContentChange: (content: string) => void
    onRecruitStatusChange: (status: string) => void
    onPositionSelect: (positionId: number) => void
    onTagToggle: (tagId: number) => void
    disabled?: boolean
}

export function PostFormFields({
                                   title,
                                   content,
                                   recruitStatus,
                                   selectedPositionId,
                                   selectedTags,
                                   positions,
                                   tags,
                                   onTitleChange,
                                   onContentChange,
                                   onRecruitStatusChange,
                                   onPositionSelect,
                                   onTagToggle,
                                   disabled = false,
                               }: PostFormFieldsProps) {
    return (
        <div className="space-y-6">
            {/* Title */}
            <Input
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
                placeholder="Title"
                className="w-full placeholder:text-muted-foreground/50 text-3xl md:text-5xl lg:text-5xl border-none font-semibold focus-visible:ring-0 px-0 shadow-none"
                disabled={disabled}
                required
            />

            {/* Position */}
            <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground block">
                    Position *
                </label>
                <div className="flex w-full items-center gap-1.5 flex-wrap">
                    {positions.map((pos) => (
                        <FilterButton
                            key={pos.id}
                            onClick={() => onPositionSelect(pos.id)}
                            isActive={selectedPositionId === pos.id}
                        >
                            {pos.name}
                        </FilterButton>
                    ))}
                </div>
            </div>

            {/* Tags */}
            <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground block">
                    Stacks / Skills
                </label>
                <div className="flex w-full items-center gap-1.5 flex-wrap">
                    {tags.map((tag) => (
                        <FilterButton
                            key={tag.id}
                            onClick={() => onTagToggle(tag.id)}
                            isActive={selectedTags.includes(tag.id)}
                        >
                            {tag.name}
                        </FilterButton>
                    ))}
                </div>
            </div>

            {/* Recruit Status */}
            <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground block">
                    Status
                </label>
                <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio" value="OPEN"
                            checked={recruitStatus === "OPEN"}
                            onChange={(e) => onRecruitStatusChange(e.target.value)}
                            disabled={disabled}
                            className="cursor-pointer accent-accent"
                        />
                        <span className="text-sm text-foreground">Open</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio" value="CLOSED"
                            checked={recruitStatus === "CLOSED"}
                            onChange={(e) => onRecruitStatusChange(e.target.value)}
                            disabled={disabled}
                            className="cursor-pointer accent-accent"
                        />
                        <span className="text-sm text-foreground">Closed</span>
                    </label>
                </div>
            </div>

            {/* Rich Text Editor */}
            <RichTextEditor content={content} onChange={onContentChange} key={content ? "loaded" : "empty"}/>
        </div>
    )
}
