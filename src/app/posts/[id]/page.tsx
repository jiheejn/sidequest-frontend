// app/posts/[id]/page.tsx
"use client"

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
// "use client"
//
// import { useState, useEffect } from "react"
// import { useRouter, useParams } from "next/navigation"
// import { useAuthStore } from "@/app/store/authStore"
// import { postApi } from "@/lib/api-client"
// import { Button } from "@/components/ui/button"
// import { Skeleton } from "@/components/ui/skeleton"
// import { FiEye, FiMessageSquare, FiEdit, FiTrash2, FiArrowLeft } from "react-icons/fi"
// import { formatDistanceToNow } from "date-fns"
// import Link from "next/link"
//
// interface Post {
//     id: number
//     title: string
//     content: string
//     boardType: string
//     recruitStatus?: string
//     category?: { id: number; name: string }
//     tags?: { id: number; name: string }[]
//     author: {
//         userId: number
//         nickname: string
//         image?: string
//     }
//     viewCount: number
//     commentCount: number
//     createdAt: string
//     updatedAt: string
// }
//
// export default function PostDetailPage() {
//     const router = useRouter()
//     const params = useParams()
//     const postId = Number(params.id)
//     const { user } = useAuthStore()
//
//     const [post, setPost] = useState<Post | null>(null)
//     const [isLoading, setIsLoading] = useState(true)
//     const [isDeleting, setIsDeleting] = useState(false)
//
//     useEffect(() => {
//         const loadPost = async () => {
//             try {
//                 const data = await postApi.getPost(postId)
//                 setPost(data as Post)
//             } catch (err) {
//                 console.error("Failed to load post:", err)
//                 router.push("/")
//             } finally {
//                 setIsLoading(false)
//             }
//         }
//         loadPost()
//     }, [postId, router])
//
//
//     const handleDelete = async () => {
//         if (!confirm("Are you sure you want to delete this post?")) return
//
//         setIsDeleting(true)
//         try {
//             await postApi.deletePost(postId)
//             router.push(`/${post?.boardType.toLowerCase()}`)
//         } catch (err: any) {
//             alert(err.message || "Failed to delete post")
//         } finally {
//             setIsDeleting(false)
//         }
//     }
//
//     if (isLoading) {
//         return (
//             <div className="container mx-auto px-4 py-8 max-w-4xl">
//                 <Skeleton className="h-10 w-3/4 mb-4" />
//                 <Skeleton className="h-6 w-1/2 mb-8" />
//                 <Skeleton className="h-96 w-full" />
//             </div>
//         )
//     }
//
//     if (!post) return null
//
//     const isAuthor = user?.userId === post.author.userId
//     const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })
//
//     return (
//         <div className="container mx-auto px-4 py-8 max-w-4xl">
//             {/* Back Button */}
//             <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => router.back()}
//                 className="mb-6 hover:scale-105 transition-transform"
//             >
//                 <FiArrowLeft className="h-4 w-4 mr-2" />
//                 Back
//             </Button>
//
//             {/* Header */}
//             <div className="mb-8">
//                 {/* Breadcrumb */}
//                 <div className="flex items-center gap-2 mb-4 text-sm">
//                     {/*<Link href={`/${post.boardType.toLowerCase()}`} className="text-muted-foreground hover:text-primary transition-colors">*/}
//                     {/*    {post.boardType}*/}
//                     {/*</Link>*/}
//                     {post.category && (
//                         <>
//                             <span className="text-muted-foreground">/</span>
//                             <span className="text-primary font-medium">{post.category.name}</span>
//                         </>
//                     )}
//                 </div>
//
//                 {/* Title & Status */}
//                 <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
//                     <div className="flex-1">
//                         <div className="flex flex-wrap items-center gap-3 mb-2">
//                             <h1 className="text-3xl md:text-4xl font-bold">{post.title}</h1>
//                             {post.recruitStatus && (
//                                 <span
//                                     className={`text-sm px-3 py-1 rounded-full font-medium whitespace-nowrap ${
//                                         post.recruitStatus === "OPEN"
//                                             ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
//                                             : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
//                                     }`}
//                                 >
//                   {post.recruitStatus}
//                 </span>
//                             )}
//                         </div>
//
//                         {/* Tags */}
//                         {post.tags && post.tags.length > 0 && (
//                             <div className="flex flex-wrap gap-2 mb-4">
//                                 {post.tags.map((tag) => (
//                                     <span
//                                         key={tag.id}
//                                         className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors cursor-default"
//                                     >
//                     {tag.name}
//                   </span>
//                                 ))}
//                             </div>
//                         )}
//                     </div>
//
//                     {/* Actions (Edit/Delete) - Only for Author */}
//                     {isAuthor && (
//                         <div className="flex gap-2">
//                             <Link href={`/posts/${post.id}/edit`}>
//                                 <Button variant="outline" size="sm" className="hover:scale-105 transition-transform">
//                                     <FiEdit className="h-4 w-4 mr-2" />
//                                     Edit
//                                 </Button>
//                             </Link>
//                             <Button
//                                 variant="destructive"
//                                 size="sm"
//                                 onClick={handleDelete}
//                                 disabled={isDeleting}
//                                 className="hover:scale-105 transition-transform"
//                             >
//                                 <FiTrash2 className="h-4 w-4 mr-2" />
//                                 Delete
//                             </Button>
//                         </div>
//                     )}
//                 </div>
//
//                 {/* Author & Meta Info */}
//                 <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground border-y py-4">
//                     <div className="flex items-center gap-3">
//                         {post.author.image ? (
//                             <img
//                                 src={post.author.image}
//                                 alt={post.author.nickname}
//                                 className="h-10 w-10 rounded-full object-cover"
//                             />
//                         ) : (
//                             <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
//                 <span className="font-medium text-primary text-lg">
//                   {post.author.nickname[0].toUpperCase()}
//                 </span>
//                             </div>
//                         )}
//                         <div>
//                             <Link href={`/profile/${post.author.userId}`} className="font-medium text-foreground hover:text-primary transition-colors">
//                                 {post.author.nickname}
//                             </Link>
//                             <div className="text-xs">{timeAgo}</div>
//                         </div>
//                     </div>
//
//                     <div className="flex items-center gap-4">
//                         <div className="flex items-center gap-1">
//                             <FiEye className="h-4 w-4" />
//                             <span>{post.viewCount}</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                             <FiMessageSquare className="h-4 w-4" />
//                             <span>{post.commentCount}</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//
//             {/* Content */}
//             <article className="prose prose-lg max-w-none dark:prose-invert mb-12">
//                 <div
//                     className="min-h-[300px]"
//                     dangerouslySetInnerHTML={{ __html: post.content }}
//                 />
//             </article>
//
//             {/* Comments Section (Placeholder) */}
//             <section className="border-t pt-8">
//                 <h2 className="text-2xl font-bold mb-6">
//                     Comments ({post.commentCount})
//                 </h2>
//
//                 {user ? (
//                     <div className="mb-8 p-4 border rounded-lg bg-muted/30">
//             <textarea
//                 placeholder="Write a comment..."
//                 className="w-full min-h-[100px] p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
//             />
//                         <div className="flex justify-end mt-2">
//                             <Button size="sm" className="hover:scale-105 transition-transform">
//                                 Post Comment
//                             </Button>
//                         </div>
//                     </div>
//                 ) : (
//                     <div className="text-center py-8 text-muted-foreground">
//                         <Link href="/login" className="text-primary hover:underline">
//                             Sign in
//                         </Link>{" "}
//                         to leave a comment
//                     </div>
//                 )}
//
//                 {/* TODO: Comment List */}
//                 {post.commentCount === 0 && (
//                     <div className="text-center py-12 text-muted-foreground">
//                         No comments yet. Be the first to comment!
//                     </div>
//                 )}
//             </section>
//         </div>
//     )
// }