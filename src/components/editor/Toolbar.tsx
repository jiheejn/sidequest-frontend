"use client"

import { type Editor } from '@tiptap/react'
import {
    Bold,
    Strikethrough,
    Italic,
    List,
    ListOrdered,
    Heading2,
    Heading3,
    Quote,
} from 'lucide-react'

interface ToolbarProps {
    editor: Editor | null
}

export function Toolbar({ editor }: ToolbarProps) {
    if (!editor) {
        return null
    }

    const ToolbarButton = ({ onClick, isActive, children }: any) => (
        <button
            type="button"
            onClick={onClick}
            className={`p-2 rounded-lg transition-colors ${
                isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent hover:text-accent-foreground'
            }`}
        >
            {children}
        </button>
    )

    return (
        <div className="flex flex-wrap items-center gap-1 rounded-t-md border border-input bg-transparent p-2">
            <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')}>
                <Bold className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')}>
                <Italic className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')}>
                <Strikethrough className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })}>
                <Heading2 className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive('heading', { level: 3 })}>
                <Heading3 className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')}>
                <List className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')}>
                <ListOrdered className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')}>
                <Quote className="h-4 w-4" />
            </ToolbarButton>
        </div>
    )
}