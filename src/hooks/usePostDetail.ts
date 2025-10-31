// hooks/usePostDetail.ts
"use client"

import { useEffect, useState } from "react"
import { postApi, bookmarkApi } from "@/lib/api-client"

export interface CommentDto {
    id: number;
    content: string;
    postId: number;
    authorId: number;
    authorNickname: string;
    createdAt: string;
    updatedAt: string;
}

export interface PostDetailDto {
    id: number;
    title: string;
    content: string;
    recruitStatus: 'OPEN' | 'CLOSED';
    position: { id: number; name: string };
    tags: { id: number; name: string }[];
    author: {
        userId: number;
        nickname: string;
        image?: string;
    };
    viewCount: number;
    commentCount: number;
    createdAt: string;
    updatedAt: string;
    comments: CommentDto[];
    isBookmarked: boolean;
}

export function usePostDetail(postId: number) {
    const [data, setData] = useState<PostDetailDto | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPost = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const postData = await postApi.getPost(postId);
            setData(postData);
        } catch (err: any) {
            setError(err.message || "Failed to load post.");
            console.error("usePostDetail error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPost();
    }, [postId]);

    const toggleBookmark = async () => {
        if (!data) return;

        try {
            const result = await bookmarkApi.toggleBookmark(postId);
            setData({ ...data, isBookmarked: result.bookmarked });
        } catch (err) {
            console.error("Bookmark toggle failed:", err);
            throw err;
        }
    };

    const refreshPost = () => {
        fetchPost();
    };

    return { data, isLoading, error, toggleBookmark, refreshPost };
}