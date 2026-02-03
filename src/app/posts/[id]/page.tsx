"use client"
export const dynamic = 'force-dynamic';

import { use } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/app/store/authStore" // Ensure this path is correct
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
        if (!user) {
            router.push("/login");
            return;
        }

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
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading post...</p>
                </div>
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-destructive mb-4">{error || "Post not found"}</p>
                    <button
                        onClick={() => router.push("/posts")}
                        className="text-primary hover:underline"
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
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground
                             transition-colors mb-6"
                >
                    <ArrowLeft className="h-5 w-5" />
                    <span>Back</span>
                </button>

                {/* Main Content Card */}
                <article className="bg-card rounded-lg border border-border/10 shadow-lg overflow-hidden">
                    {/* Header Section */}
                    <div className="p-6 sm:p-8 border-b border-border/10">
                        {/* Status, Position, Tags */}
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                            <RecruitStatusBadge status={post.recruitStatus} />
                            <span className="px-3 py-1 rounded-full text-xs font-semibold
                                           bg-secondary text-secondary-foreground">
                                {post.position.name}
                            </span>
                            {post.tags.map(tag => (
                                <span key={tag.id} className="px-3 py-1 rounded-full text-xs font-medium
                                                              bg-muted text-muted-foreground">
                                    {tag.name}
                                </span>
                            ))}
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                            {post.title}
                        </h1>

                        {/* Author & Meta Info */}
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-3">
                                {/* Avatar */}
                                <div className="h-10 w-10 rounded-full overflow-hidden bg-primary/20
                                              flex items-center justify-center">
                                    {post.author.image ? (
                                        <img
                                            src={post.author.image}
                                            alt={post.author.nickname}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-sm font-semibold text-primary">
                                            {post.author.nickname[0].toUpperCase()}
                                        </span>
                                    )}
                                </div>
                                {/* Author Info */}
                                <div>
                                    <p className="font-semibold text-foreground">
                                        {post.author.nickname}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {formatDistanceToNow(new Date(post.createdAt), {
                                            addSuffix: true,
                                            locale: enUS,
                                        })}
                                    </p>
                                </div>
                            </div>

                            {/* Meta Stats */}
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                    <Eye className="h-4 w-4" />
                                    {post.viewCount}
                                </span>
                                <span className="flex items-center gap-1">
                                    <MessageSquare className="h-4 w-4" />
                                    {post.commentCount}
                                </span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 mt-6 pt-6 border-t border-border/10">
                            {/* Bookmark */}
                            <button
                                onClick={handleBookmark}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg
                                         transition-all duration-200
                                         hover:bg-accent/20 outline-none"
                            >
                                <Bookmark
                                    className={`h-5 w-5 ${
                                        post.isBookmarked
                                            ? "fill-primary text-primary"
                                            : "text-muted-foreground"
                                    }`}
                                />
                                <span className="text-sm font-medium text-foreground">
                                    {post.isBookmarked ? "Bookmarked" : "Bookmark"}
                                </span>
                            </button>

                            {/* Edit & Delete (Only for author) */}
                            {isAuthor && (
                                <>
                                    <button
                                        onClick={() => router.push(`/posts/${postId}/edit`)}
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg
                                                 text-foreground hover:bg-accent/20 transition-colors"
                                    >
                                        <Edit className="h-4 w-4" />
                                        <span className="text-sm font-medium">Edit</span>
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg
                                                 text-destructive hover:bg-destructive/10 transition-colors"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        <span className="text-sm font-medium">Delete</span>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 sm:p-8">
                        <div
                            className="prose prose-slate dark:prose-invert max-w-none
                                     prose-headings:text-foreground prose-p:text-foreground
                                     prose-strong:text-foreground prose-code:text-foreground
                                     prose-a:text-primary"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </div>

                    {/* Comments Section */}
                    <div className="p-6 sm:p-8 border-t border-border/10">
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