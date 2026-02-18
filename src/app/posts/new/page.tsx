"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/app/store/authStore"
import { postApi } from "@/lib/api-client"
import { usePostFormData } from "@/hooks/usePostFormData"
import { PostFormFields } from "@/components/PostFormFields"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Loader2 } from "lucide-react"

export default function CreatePostPage() {
    const router = useRouter()
    const { isAuthenticated, isLoading: authLoading } = useAuthStore()
    const { tags, positions, isLoading: dataLoading, error: dataError } = usePostFormData()

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [recruitStatus, setRecruitStatus] = useState("OPEN")
    const [selectedPositionId, setSelectedPositionId] = useState<number | null>(null)
    const [selectedTags, setSelectedTags] = useState<number[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push("/login")
        }
    }, [authLoading, isAuthenticated, router])

    const handleTagToggle = (tagId: number) => {
        setSelectedTags((prev) =>
            prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
        )
    }

    const handleSubmit = async () => {
        if (!title.trim()) {
            setError("Title cannot be empty.")
            return
        }
        if (!content.replace(/<(.|\n)*?>/g, "").trim()) {
            setError("Content cannot be empty.")
        }
        if (!selectedPositionId) {
            setError("Please select a Position.")
            return
        }

        setIsSubmitting(true)
        setError("")

        try {
            const postData = {
                title,
                content,
                boardType: "TEAMUP",
                recruitStatus,
                positionId: selectedPositionId,
                tagIds: selectedTags,
            }

            const newPost = await postApi.createPost(postData)
            router.push(`/posts/${newPost.id}`)
        } catch (err: any) {
            setError(err.message || "Failed to create post. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    if (authLoading || dataLoading) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <Skeleton className="h-16 w-full mb-8" />
                <Skeleton className="h-64 w-full" />
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            {/* 상단 에러 메시지 */}
            {(error || dataError) && (
                <div className="mb-6 p-4 rounded-lg bg-destructive/10 text-destructive text-sm font-medium">
                    {error || dataError}
                </div>
            )}

            {/* 폼 필드 영역 */}
            <div className="space-y-8">
                <PostFormFields
                    title={title}
                    content={content}
                    recruitStatus={recruitStatus}
                    selectedPositionId={selectedPositionId}
                    selectedTags={selectedTags}
                    positions={positions}
                    tags={tags}
                    onTitleChange={setTitle}
                    onContentChange={setContent}
                    onRecruitStatusChange={setRecruitStatus}
                    onPositionSelect={setSelectedPositionId}
                    onTagToggle={handleTagToggle}
                    disabled={isSubmitting}
                />

                {/* 하단 버튼 영역 */}
                <div className="flex items-center justify-end gap-3 pt-8 border-t border-border/30">
                    <Button
                        variant="ghost"
                        onClick={() => router.back()}
                        disabled={isSubmitting}
                        className="text-muted-foreground"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        size="lg"
                        className="px-8 font-semibold"
                    >
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Publish Post
                    </Button>
                </div>
            </div>
        </div>
    )
}
