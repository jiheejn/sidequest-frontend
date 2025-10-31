// hooks/usePosts.ts
"use client"

import { useEffect, useState, useMemo, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import {PageData, postApi, PostListDto} from "@/lib/api-client"

export function usePosts() {
    const searchParams = useSearchParams();

    const [data, setData] = useState<PageData<PostListDto> | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const params = useMemo(() => ({
        page: Number(searchParams.get("page")) || 1,
        tags: searchParams.getAll("tagIds").map(Number),
        position: Number(searchParams.get("positionId")),
        status: searchParams.get("status") || undefined
    }), [searchParams]);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const postsData = await postApi.getPosts({
                page: params.page - 1,
                tags: params.tags,
                position: params.position,
                status: params.status,
                size: 15
            });
            setData(postsData);

        } catch (err: any) {
            setError(err.message || "Failed to load posts.");
            console.error("usePosts error:", err);
        } finally {
            setIsLoading(false);
        }
    }, [params]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const refetch = useCallback(() => {
        fetchData();
    }, [fetchData]);

    return { data, isLoading, error, params, refetch };
}