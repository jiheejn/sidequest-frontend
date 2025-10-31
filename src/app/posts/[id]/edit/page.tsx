// app/posts/[id]/edit/page.tsx
"use client"

import { use, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/app/store/authStore"
import { postApi } from "@/lib/api-client"
import { usePostDetail } from "@/hooks/usePostDetail"
import { usePostFormData } from "@/hooks/usePostFormData"
import { PostFormFields } from "@/components/PostFormFields"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Loader2, ArrowLeft } from "lucide-react"

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const postId = Number(id)
    const router = useRouter()
    const user = useAuthStore((state) => state.user)

    const { data: post, isLoading: postLoading, error: postError } = usePostDetail(postId)
    const { tags, positions, isLoading: dataLoading } = usePostFormData()

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [recruitStatus, setRecruitStatus] = useState("OPEN")
    const [selectedPositionId, setSelectedPositionId] = useState<number | null>(null)
    const [selectedTags, setSelectedTags] = useState<number[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState("")

    // Load post data into form
    useEffect(() => {
        if (post) {
            // Check authorization
            if (!user || user.userId !== post.author.userId) {
                alert("You don't have permission to edit this post")
                router.push(`/posts/${postId}`)
                return
            }

            setTitle(post.title)
            setContent(post.content)
            setRecruitStatus(post.recruitStatus)
            setSelectedPositionId(post.position.id)
            setSelectedTags(post.tags.map((tag) => tag.id))
        }
    }, [post, user, postId, router])

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
            return
        }
        if (!selectedPositionId) {
            setError("Please select a Position.")
            return
        }

        setIsSubmitting(true)
        setError("")

        try {
            await postApi.updatePost(postId, {
                title,
                content,
                recruitStatus,
                positionId: selectedPositionId,
                tagIds: selectedTags,
            })

            router.push(`/posts/${postId}`)
        } catch (err: any) {
            setError(err.message || "Failed to update post. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    if (postLoading || dataLoading) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <Skeleton className="h-12 w-1/2 mb-4" />
                <Skeleton className="h-8 w-3/4 mb-8" />
                <Skeleton className="h-16 w-full mb-6" />
                <Skeleton className="h-64 w-full" />
            </div>
        )
    }

    if (postError || !post) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-destructive mb-4">{postError || "Post not found"}</p>
                    <button onClick={() => router.push("/posts")} className="text-primary hover:underline">
                        Back to posts
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground
                         transition-colors mb-6"
            >
                <ArrowLeft className="h-5 w-5" />
                <span>Back</span>
            </button>

            <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight">Edit Post</h1>
                    <p className="text-muted-foreground mt-2">Update your project details.</p>
                </div>
                <div className="flex gap-4 mt-4 md:mt-0">
                    <Button variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Changes
                    </Button>
                </div>
            </header>

            {error && <p className="mb-4 text-sm text-destructive">{error}</p>}

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
        </div>
    )
}