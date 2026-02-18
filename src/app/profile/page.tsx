"use client"

import {useEffect, useState} from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/app/store/authStore"
import { useUserProfile } from "@/hooks/useUserProfile"
import { PostListItem } from "@/components/PostListItem"
import { Edit, FileText, Bookmark as BookmarkIcon } from "lucide-react"

type Tab = "posts" | "bookmarks"

export default function ProfilePage() {
    const router = useRouter();
    const user = useAuthStore((state) => state.user);
    const [activeTab, setActiveTab] = useState<Tab>("posts");
    const { myPosts, myBookmarks, isLoadingPosts, isLoadingBookmarks } = useUserProfile(user?.userId || 0);

    useEffect(() => {
        if (!user) {
            router.push("/login")
        }
    }, [user, router])

    if (!user) {
        return <div>Loading...</div>
    }

    return (
        <div className="min-h-screen bg-background py-8">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Profile Header */}
                <div className="bg-card rounded-xl border border-border p-8 mb-6">
                    <div className="flex flex-col items-center text-center">
                        <div className="h-20 w-20 rounded-full overflow-hidden bg-secondary
                                      flex items-center justify-center mb-4">
                            {user.image ? (
                                <img src={user.image} alt={user.nickname}
                                     className="h-full w-full object-cover" />
                            ) : (
                                <span className="text-2xl font-semibold text-foreground">
                                    {user.nickname[0].toUpperCase()}
                                </span>
                            )}
                        </div>

                        <h1 className="text-lg font-semibold text-foreground mb-0.5">
                            {user.nickname}
                        </h1>
                        <p className="text-sm text-muted-foreground mb-4">
                            {user.email}
                        </p>

                        <button
                            onClick={() => router.push("/profile/edit")}
                            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium
                                     bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                        >
                            <Edit className="h-3.5 w-3.5" />
                            <span>Edit Profile</span>
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1 mb-6 border-b border-border">
                    <button
                        onClick={() => setActiveTab("posts")}
                        className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium
                                  border-b-2 -mb-px transition-colors ${
                            activeTab === "posts"
                                ? "border-foreground text-foreground"
                                : "border-transparent text-muted-foreground hover:text-foreground"
                        }`}
                    >
                        <FileText className="h-4 w-4" />
                        Posts
                        <span className="ml-1 text-xs text-muted-foreground">
                            {myPosts.length}
                        </span>
                    </button>

                    <button
                        onClick={() => setActiveTab("bookmarks")}
                        className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium
                                  border-b-2 -mb-px transition-colors ${
                            activeTab === "bookmarks"
                                ? "border-foreground text-foreground"
                                : "border-transparent text-muted-foreground hover:text-foreground"
                        }`}
                    >
                        <BookmarkIcon className="h-4 w-4" />
                        Bookmarks
                        <span className="ml-1 text-xs text-muted-foreground">
                            {myBookmarks.length}
                        </span>
                    </button>
                </div>

                {/* Content */}
                <div className="space-y-3">
                    {activeTab === "posts" && (
                        <>
                            {isLoadingPosts ? (
                                <div className="text-center py-12">
                                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-border border-t-foreground mx-auto mb-4" />
                                    <p className="text-sm text-muted-foreground">Loading posts...</p>
                                </div>
                            ) : myPosts.length === 0 ? (
                                <div className="text-center py-12 bg-card rounded-xl border border-border">
                                    <FileText className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
                                    <p className="text-sm text-muted-foreground">No posts yet.</p>
                                    <p className="text-xs text-muted-foreground mt-1">Start sharing your projects!</p>
                                </div>
                            ) : (
                                myPosts.map((post) => (
                                    <PostListItem key={post.id} post={post} />
                                ))
                            )}
                        </>
                    )}

                    {activeTab === "bookmarks" && (
                        <>
                            {isLoadingBookmarks ? (
                                <div className="text-center py-12">
                                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-border border-t-foreground mx-auto mb-4" />
                                    <p className="text-sm text-muted-foreground">Loading bookmarks...</p>
                                </div>
                            ) : myBookmarks.length === 0 ? (
                                <div className="text-center py-12 bg-card rounded-xl border border-border">
                                    <BookmarkIcon className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
                                    <p className="text-sm text-muted-foreground">No bookmarks yet.</p>
                                    <p className="text-xs text-muted-foreground mt-1">Bookmark posts to save them!</p>
                                </div>
                            ) : (
                                myBookmarks.map((bookmark) => (
                                    <div
                                        key={bookmark.id}
                                        className="p-4 bg-card rounded-xl border border-border
                                                 hover:border-foreground/20 transition-colors cursor-pointer"
                                        onClick={() => router.push(`/posts/${bookmark.postId}`)}
                                    >
                                        <h3 className="text-sm font-medium text-foreground">
                                            {bookmark.postTitle}
                                        </h3>
                                    </div>
                                ))
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
