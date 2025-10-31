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
    // 모든 Hook을 무조건 맨 위에서 호출하고, 조건문이나 early return은 그 다음에 써야함!!!
    // ✅ useEffect 안에서 navigation
    useEffect(() => {
        if (!user) {
            router.push("/login")
        }
    }, [user, router])

    // 로딩 중일 때 표시
    if (!user) {
        return <div>Loading...</div>
    }

    return (
        <div className="min-h-screen bg-background py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Profile Header */}
                <div className="bg-card rounded-lg border border-border/10 shadow-lg p-8 mb-6">
                    <div className="flex flex-col items-center text-center">
                        {/* Avatar */}
                        <div className="h-24 w-24 rounded-full overflow-hidden bg-primary/20
                                      flex items-center justify-center mb-4">
                            {user.image ? (
                                <img
                                    src={user.image}
                                    alt={user.nickname}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <span className="text-3xl font-bold text-primary">
                                    {user.nickname[0].toUpperCase()}
                                </span>
                            )}
                        </div>

                        {/* Nickname */}
                        <h1 className="text-2xl font-bold text-foreground mb-1">
                            {user.nickname}
                        </h1>

                        {/* Email */}
                        <p className="text-sm text-muted-foreground mb-4">
                            {user.email}
                        </p>

                        {/* Edit Profile Button */}
                        <button
                            onClick={() => router.push("/profile/edit")}
                            className="flex items-center gap-2 px-6 py-2 rounded-lg
                                     bg-primary text-primary-foreground font-medium
                                     hover:bg-primary/90 transition-colors"
                        >
                            <Edit className="h-4 w-4" />
                            <span>Edit Profile</span>
                        </button>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex items-center gap-2 mb-6 border-b border-border/20 pb-2">
                    <button
                        onClick={() => setActiveTab("posts")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium
                                  transition-all duration-200 ${
                            activeTab === "posts"
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:text-foreground hover:bg-accent/20"
                        }`}
                    >
                        <FileText className="h-4 w-4" />
                        <span>Posts</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                            activeTab === "posts"
                                ? "bg-primary-foreground/20"
                                : "bg-muted"
                        }`}>
                            {myPosts.length}
                        </span>
                    </button>

                    <button
                        onClick={() => setActiveTab("bookmarks")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium
                                  transition-all duration-200 ${
                            activeTab === "bookmarks"
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:text-foreground hover:bg-accent/20"
                        }`}
                    >
                        <BookmarkIcon className="h-4 w-4" />
                        <span>Bookmarks</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                            activeTab === "bookmarks"
                                ? "bg-primary-foreground/20"
                                : "bg-muted"
                        }`}>
                            {myBookmarks.length}
                        </span>
                    </button>
                </div>

                {/* Content Area */}
                <div className="space-y-4">
                    {/* Posts Tab */}
                    {activeTab === "posts" && (
                        <>
                            {isLoadingPosts ? (
                                <div className="text-center py-12">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                                    <p className="text-muted-foreground">Loading posts...</p>
                                </div>
                            ) : myPosts.length === 0 ? (
                                <div className="text-center py-12 bg-card rounded-lg border border-border/10">
                                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                    <p className="text-muted-foreground">No posts yet.</p>
                                    <p className="text-sm text-muted-foreground mt-2">
                                        Start sharing your projects!
                                    </p>
                                </div>
                            ) : (
                                myPosts.map((post) => (
                                    <PostListItem key={post.id} post={post} />
                                ))
                            )}
                        </>
                    )}

                    {/* Bookmarks Tab */}
                    {activeTab === "bookmarks" && (
                        <>
                            {isLoadingBookmarks ? (
                                <div className="text-center py-12">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                                    <p className="text-muted-foreground">Loading bookmarks...</p>
                                </div>
                            ) : myBookmarks.length === 0 ? (
                                <div className="text-center py-12 bg-card rounded-lg border border-border/10">
                                    <BookmarkIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                    <p className="text-muted-foreground">No bookmarks yet.</p>
                                    <p className="text-sm text-muted-foreground mt-2">
                                        Bookmark posts to save them for later!
                                    </p>
                                </div>
                            ) : (
                                myBookmarks.map((bookmark) => (
                                    <div
                                        key={bookmark.id}
                                        className="p-6 bg-card rounded-lg border border-border/10
                                                 shadow-lg hover:border-primary/30 transition-all cursor-pointer"
                                        onClick={() => router.push(`/posts/${bookmark.postId}`)}
                                    >
                                        <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors">
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