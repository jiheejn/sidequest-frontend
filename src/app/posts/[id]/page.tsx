"use client"
export const dynamic = 'force-dynamic';

import { use } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/app/store/authStore"
import { usePostDetail } from "@/hooks/usePostDetail"
import { RecruitStatusBadge } from "@/components/RecruitStatusBadge"
import { CommentSection } from "@/components/CommentSection"
import { formatDistanceToNow } from "date-fns"
import { enUS } from "date-fns/locale"
import {
    ArrowLeft,
    Eye,
    Bookmark,
    Edit,
    Trash2,
    MessageSquare
} from "lucide-react"
import { postApi } from "@/lib/api-client"

export default function PostDetailPage({
                                           params
                                       }: {
    params: Promise<{ id: string }>
}) {
    const { id } = use(params);
    const postId = Number(id);
    const router = useRouter();
    const user = useAuthStore((state) => state.user);
    const { data: post, isLoading, error, toggleBookmark, refreshPost } = usePostDetail(postId);

    const handleBookmark = async () => {
        if (!user) { router.push("/login"); return; }
        try {
            await toggleBookmark();
        } catch (error) {
            console.error("Bookmark failed:", error);
            alert("Failed to bookmark post");
        }
    };

    const handleDelete = async () => {
        if (!confirm("Delete this post?")) return;
        try {
            await postApi.deletePost(postId);
            router.push("/posts");
        } catch (error) {
            console.error("Delete failed:", error);
            alert("Failed to delete post");
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-border border-t-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">Loading post...</p>
                </div>
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-destructive text-sm mb-4">{error || "Post not found"}</p>
                    <button
                        onClick={() => router.push("/posts")}
                        className="text-sm text-foreground hover:underline"
                    >
                        Back to posts
                    </button>
                </div>
            </div>
        );
    }

    const isAuthor = user?.userId === post.author.userId;

    return (
        <div className="min-h-screen bg-background py-8">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground
                             transition-colors mb-6"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                </button>

                <article className="bg-card rounded-xl border border-border overflow-hidden">
                    {/* Header */}
                    <div className="p-6 sm:p-8">
                        {/* Tags */}
                        <div className="flex flex-wrap items-center gap-1.5 mb-4">
                            <RecruitStatusBadge status={post.recruitStatus} />
                            <span className="px-2 py-0.5 rounded-md text-xs font-medium
                                           bg-accent/10 text-accent-foreground">
                                {post.position.name}
                            </span>
                            {post.tags.map(tag => (
                                <span key={tag.id} className="px-2 py-0.5 rounded-md text-xs
                                                              text-muted-foreground bg-secondary">
                                    {tag.name}
                                </span>
                            ))}
                        </div>

                        {/* Title */}
                        <h1 className="text-2xl sm:text-3xl font-semibold text-foreground mb-6 tracking-tight leading-snug">
                            {post.title}
                        </h1>

                        {/* Author & Meta */}
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full overflow-hidden bg-secondary
                                              flex items-center justify-center">
                                    {post.author.image ? (
                                        <img src={post.author.image} alt={post.author.nickname}
                                             className="h-full w-full object-cover" />
                                    ) : (
                                        <span className="text-xs font-medium text-foreground">
                                            {post.author.nickname[0].toUpperCase()}
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-foreground">{post.author.nickname}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true, locale: enUS })}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                    <Eye className="h-3.5 w-3.5" /> {post.viewCount}
                                </span>
                                <span className="flex items-center gap-1">
                                    <MessageSquare className="h-3.5 w-3.5" /> {post.commentCount}
                                </span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1 mt-6 pt-5 border-t border-border">
                            <button
                                onClick={handleBookmark}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm
                                         hover:bg-secondary transition-colors"
                            >
                                <Bookmark className={`h-4 w-4 ${
                                    post.isBookmarked ? "fill-accent text-accent" : "text-muted-foreground"
                                }`} />
                                <span className="text-muted-foreground">
                                    {post.isBookmarked ? "Saved" : "Save"}
                                </span>
                            </button>

                            {isAuthor && (
                                <>
                                    <button
                                        onClick={() => router.push(`/posts/${postId}/edit`)}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm
                                                 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                                    >
                                        <Edit className="h-4 w-4" />
                                        <span>Edit</span>
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm
                                                 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        <span>Delete</span>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="px-6 sm:px-8 pb-8">
                        <div className="h-px bg-border mb-6" />
                        <div
                            className="prose prose-neutral dark:prose-invert max-w-none text-sm leading-relaxed
                                     prose-headings:text-foreground prose-headings:font-semibold
                                     prose-p:text-foreground/85
                                     prose-a:text-accent-foreground prose-a:no-underline hover:prose-a:underline"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </div>

                    {/* Comments */}
                    <div className="px-6 sm:px-8 pb-8 pt-6 border-t border-border">
                        <CommentSection
                            comments={post.comments}
                            postId={postId}
                            onCommentChanged={refreshPost}
                        />
                    </div>
                </article>
            </div>
        </div>
    );
}
