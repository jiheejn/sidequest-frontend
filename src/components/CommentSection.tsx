// components/CommentSection.tsx
"use client"

import { useState } from "react"
import { useAuthStore } from "@/app/store/authStore" // Ensure this path is correct
import { useRouter } from "next/navigation"
import { formatDistanceToNow } from "date-fns"
import { enUS } from "date-fns/locale"
import { CommentDto } from "@/hooks/usePostDetail"
import { MessageSquare, Trash2, Edit2 } from "lucide-react"
import { commentApi } from "@/lib/api-client"

interface CommentSectionProps {
    comments: CommentDto[];
    postId: number;
    onCommentChanged: () => void;
}

export function CommentSection({
                                   comments,
                                   postId,
                                   onCommentChanged
                               }: CommentSectionProps) {
    const user = useAuthStore((state) => state.user);
    const router = useRouter();
    const [newComment, setNewComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editContent, setEditContent] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) {
            router.push("/login");
            return;
        }

        if (!newComment.trim() || isSubmitting) return;

        setIsSubmitting(true);
        try {
            await commentApi.createComment(postId, { content: newComment });
            setNewComment("");
            onCommentChanged();
        } catch (error) {
            console.error("Comment submission failed:", error);
            alert("Failed to post comment");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (commentId: number) => {
        if (!confirm("Delete this comment?")) return;

        try {
            await commentApi.deleteComment(postId, commentId);
            onCommentChanged();
        } catch (error) {
            console.error("Comment deletion failed:", error);
            alert("Failed to delete comment");
        }
    };

    const handleEdit = async (commentId: number) => {
        if (!editContent.trim()) return;

        try {
            await commentApi.updateComment(postId, commentId, { content: editContent });
            setEditingId(null);
            setEditContent("");
            onCommentChanged();
        } catch (error) {
            console.error("Comment update failed:", error);
            alert("Failed to update comment");
        }
    };

    return (
        <div className="mt-12 space-y-6">
            {/* Header */}
            <div className="flex items-center gap-2 pb-4 border-b border-border/20">
                <MessageSquare className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold text-foreground">
                    Comments ({comments.length})
                </h2>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder={user ? "Write a comment..." : "Please login to comment"}
                    disabled={!user || isSubmitting}
                    className="w-full min-h-[100px] p-4 rounded-lg bg-card border border-border/20
                             text-foreground placeholder:text-muted-foreground
                             focus:outline-none focus:ring-2 focus:ring-primary/50
                             disabled:opacity-50 disabled:cursor-not-allowed
                             resize-none"
                />
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={!user || !newComment.trim() || isSubmitting}
                        className="px-6 py-2 rounded-lg bg-primary text-primary-foreground
                                 font-medium transition-all duration-200
                                 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? "Posting..." : "Post Comment"}
                    </button>
                </div>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
                {comments.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                        No comments yet. Be the first to comment!
                    </p>
                ) : (
                    comments.map((comment) => (
                        <div
                            key={comment.id}
                            className="p-4 rounded-lg bg-card border border-border/10"
                        >
                            {/* Comment Header */}
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                                        <span className="text-sm font-semibold text-primary">
                                            {comment.authorNickname[0].toUpperCase()}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-foreground">
                                            {comment.authorNickname}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {formatDistanceToNow(new Date(comment.createdAt), {
                                                addSuffix: true,
                                                locale: enUS,
                                            })}
                                        </p>
                                    </div>
                                </div>

                                {/* Edit/Delete buttons */}
                                {user?.userId === comment.authorId && (
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => {
                                                setEditingId(comment.id);
                                                setEditContent(comment.content);
                                            }}
                                            className="p-1 text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            <Edit2 className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(comment.id)}
                                            className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Comment Content */}
                            {editingId === comment.id ? (
                                <div className="space-y-2">
                                    <textarea
                                        value={editContent}
                                        onChange={(e) => setEditContent(e.target.value)}
                                        className="w-full min-h-[80px] p-3 rounded-lg bg-background border border-border/20
                                                 text-foreground resize-none
                                                 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    />
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => {
                                                setEditingId(null);
                                                setEditContent("");
                                            }}
                                            className="px-4 py-1.5 rounded-lg text-sm font-medium
                                                     text-foreground hover:bg-muted transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => handleEdit(comment.id)}
                                            className="px-4 py-1.5 rounded-lg text-sm font-medium
                                                     bg-primary text-primary-foreground
                                                     hover:bg-primary/90 transition-colors"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-foreground whitespace-pre-wrap">
                                    {comment.content}
                                </p>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}