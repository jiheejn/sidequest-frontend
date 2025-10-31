"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Toolbar } from './Toolbar'

interface RichTextEditorProps {
    content: string;
    onChange: (richText: string) => void;
}

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
    const editor = useEditor({

        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [2, 3],
                },
            }),
        ],
        immediatelyRender: false,
        content: content,
        editorProps: {
            attributes: {
                class:
                    'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none rounded-b-md border border-input bg-background p-4 min-h-[300px]',
            },
        },
        onUpdate({ editor }) {
            onChange(editor.getHTML())
        },
    })

    return (
        <div className="flex flex-col justify-stretch">
            <Toolbar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    )
}