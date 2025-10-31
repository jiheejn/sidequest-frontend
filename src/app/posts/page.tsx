"use client"
import {useMemo, useState} from "react"; // useMemo는 usePosts 훅 안에서 사용됨

// Custom Hooks
import { usePosts } from "@/hooks/usePosts"; // 게시글 데이터 로딩
import { useFilterData } from "@/hooks/useFilterData"; // 필터 옵션(태그, 포지션) 로딩
import { useFilterActions } from "@/hooks/useFilterActions"; // 필터 변경 액션

// UI Components
import { PostListItem } from "@/components/PostListItem"; // 게시글 항목
import { Pagination } from "@/components/Pagination"; // 페이지네이션
import { Skeleton } from "@/components/ui/skeleton"; // 로딩 스켈레톤
import { FilterBar } from "@/components/FilterBar"; // 필터 바

// Fonts (이전 코드에서 가져옴)
import { Anta } from "next/font/google";
import {bookmarkApi} from "@/lib/api-client";
import {useAuthStore} from "@/app/store/authStore";
const anta = Anta({ weight: "400", subsets: ['latin'] }); // subset 추가 권장

export default function TeamBuildPage() {
    // --- Custom Hooks 호출 ---
    // 1. 필터 옵션 데이터 로딩 (태그, 포지션 목록)
    const { allTags, allPositions, isLoading: isFilterLoading, error: filterError } = useFilterData();
    // 2. 필터 변경 액션 가져오기
    const { handleTagToggle, handlePositionChange, handleClearStacks, handleShowOpenOnlyChange, showOpenOnly } = useFilterActions();
    // 3. 게시글 데이터 로딩 (현재 URL 파라미터 기반)
    const user = useAuthStore((state) => state.user);
    const { data: postData, isLoading: isPostsLoading, error: postsError, params, refetch } = usePosts();

    // const handleBookmarkToggle = async (postId: number) => {
    //     if (!user) return;
    //
    //     try {
    //         await bookmarkApi.toggleBookmark(postId);
    //         refetch(); // 목록 새로고침
    //     } catch (error) {
    //         console.error("Bookmark toggle failed:", error);
    //     }
    // };

    // --- 에러 처리 ---
    // 필터 로딩 에러 또는 게시글 로딩 에러 중 하나라도 발생하면 에러 메시지 표시
    const error = filterError || postsError;
    if (error) {
        return <div className="container mx-auto max-w-5xl py-8 text-center text-destructive">{error}</div>;
    }

    // --- 로딩 상태 ---
    // 필터 옵션 로딩 중이거나, 게시글 로딩 중이면 로딩 UI 표시
    const isLoading = isFilterLoading || isPostsLoading;

    return (
        <div className="container mx-auto max-w-5xl py-8">
            {/* 페이지 제목 */}
            <h1 className={`${anta.className} text-4xl mb-4 tracking-tight text-foreground`}>Find your team.</h1>
            <p className="text-muted-foreground mb-8">Discover projects and connect with creators.</p>

            {/* 필터 바 */}
            <div className="mb-8">
                {isFilterLoading ? (
                    // 필터 로딩 중 스켈레톤
                    <Skeleton className="h-32 w-full rounded-lg" />
                ) : (
                    <FilterBar
                        allPositions={allPositions}
                        selectedPositionId={params.position} // usePosts에서 가져온 현재 position ID
                        onPositionChange={handlePositionChange}
                        allTags={allTags}
                        selectedTagIds={params.tags} // usePosts에서 가져온 현재 tag IDs
                        onTagToggle={handleTagToggle}
                        onClearStacks={handleClearStacks}
                        showOpenOnly={showOpenOnly}
                        onShowOpenOnlyChange={handleShowOpenOnlyChange}
                    />
                )}
            </div>

            {/* 게시글 목록 */}
            {isLoading ? (
                // 게시글 로딩 중 스켈레톤
                <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-24 w-full rounded-lg" />
                    ))}
                </div>
            ) : (
                <>
                    {/* 게시글 목록 렌더링 */}
                    <div className="space-y-4">
                        {/* 각 PostListItem 사이에 간격 추가 */}
                        {postData && postData.content && postData.content.length > 0 ? (
                        // 이 블록 안에서는 postData와 postData.content가 null/undefined가 아님이 보장됨
                        postData.content.map((post) => (
                            <PostListItem key={post.id} post={post}
                            />
                        ))
                    ) : (
                            // 게시글 없을 때 메시지
                            <div className="text-center py-16">
                                <p className="text-muted-foreground">No projects found matching your filters.</p>
                                <p className="text-sm text-muted-foreground/80 mt-2">Try adjusting or clearing your filters.</p>
                            </div>
                        )}
                    </div>

                    {/* 페이지네이션 */}
                    {postData && postData.totalPages > 1 && (
                        <Pagination
                            totalPages={postData.totalPages}
                            className="mt-12" // 목록과의 간격 추가
                        />
                    )}
                </>
            )}
        </div>
    );
}