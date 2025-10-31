// hooks/useUserProfile.ts
"use client"

import { useEffect, useState } from "react"
import { postApi, bookmarkApi } from "@/lib/api-client"
import { PostListDto } from "@/lib/api-client"

export interface UserPost {
    id: number;
    title: string;
    recruitStatus: 'OPEN' | 'CLOSED';
    position: { id: number; name: string };
    tags: { id: number; name: string }[];
    viewCount: number;
    commentCount: number;
    createdAt: string;
}

export interface UserBookmark {
    id: number;
    postId: number;
    postTitle: string;
    userId: number;
}

export function useUserProfile(userId: number) {
    const [myPosts, setMyPosts] = useState<PostListDto[]>([]);
    const [myBookmarks, setMyBookmarks] = useState<UserBookmark[]>([]);
    const [isLoadingPosts, setIsLoadingPosts] = useState(true);
    const [isLoadingBookmarks, setIsLoadingBookmarks] = useState(true);

    useEffect(() => {
        const fetchMyPosts = async () => {
            setIsLoadingPosts(true);
            try {
                const data = await postApi.getMyPosts(userId);
                setMyPosts(data);
            } catch (error) {
                console.error("Failed to fetch user posts:", error);
            } finally {
                setIsLoadingPosts(false);
            }
        };

        const fetchMyBookmarks = async () => {
            setIsLoadingBookmarks(true);
            try {
                const data = await bookmarkApi.getMyBookmarks();
                setMyBookmarks(data);
            } catch (error) {
                console.error("Failed to fetch bookmarks:", error);
            } finally {
                setIsLoadingBookmarks(false);
            }
        };

        fetchMyPosts();
        fetchMyBookmarks();
    }, [userId]);

    return { myPosts, myBookmarks, isLoadingPosts, isLoadingBookmarks };
}