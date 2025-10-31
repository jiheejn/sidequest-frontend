// components/post/PostFormFields.tsx
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
            {/* Title Input */}
            <Input
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
                placeholder="Project Title Here..."
                className="h-14 border-none text-3xl font-bold focus-visible:ring-0 px-0 shadow-none"
                disabled={disabled}
                required
            />

            {/* Position Selection */}
            <div className="space-y-3">
                <label className="text-sm font-semibold text-text/90 block">
                    Position You're Looking For *
                </label>
                <div className="flex w-full items-center gap-2 flex-wrap">
                    {positions.map((pos) => (
                        <FilterButton
                            key={pos.id}
                            onClick={() => onPositionSelect(pos.id)}
                            isActive={selectedPositionId === pos.id}
                            //disabled={disabled}
                        >
                            {pos.name}
                        </FilterButton>
                    ))}
                </div>
            </div>

            {/* Tags Selection */}
            <div className="space-y-3">
                <label className="text-sm font-semibold text-text/90 block">
                    Required Stacks / Skills
                </label>
                <div className="flex w-full items-center gap-2 flex-wrap">
                    {tags.map((tag) => (
                        <FilterButton
                            key={tag.id}
                            onClick={() => onTagToggle(tag.id)}
                            isActive={selectedTags.includes(tag.id)}
                            //disabled={disabled}
                        >
                            {tag.name}
                        </FilterButton>
                    ))}
                </div>
            </div>

            {/* Recruit Status */}
            <div className="space-y-2">
                <label className="text-sm font-semibold text-text/90 block">
                    Recruitment Status
                </label>
                <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            value="OPEN"
                            checked={recruitStatus === "OPEN"}
                            onChange={(e) => onRecruitStatusChange(e.target.value)}
                            disabled={disabled}
                            className="cursor-pointer accent-primary"
                        />
                        <span className="text-sm">Open</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            value="CLOSED"
                            checked={recruitStatus === "CLOSED"}
                            onChange={(e) => onRecruitStatusChange(e.target.value)}
                            disabled={disabled}
                            className="cursor-pointer accent-primary"
                        />
                        <span className="text-sm">Closed</span>
                    </label>
                </div>
            </div>

            {/* Rich Text Editor */}
            <RichTextEditor content={content} onChange={onContentChange} key={content ? "loaded" : "empty"}/>
        </div>
    )
}