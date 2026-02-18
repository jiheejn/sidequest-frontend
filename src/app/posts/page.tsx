"use client"

export const dynamic = 'force-dynamic';

import { Suspense } from "react"; // 1. Suspense 추가
import { usePosts } from "@/hooks/usePosts";
import { useFilterData } from "@/hooks/useFilterData";
import { useFilterActions } from "@/hooks/useFilterActions";
import { PostListItem } from "@/components/PostListItem";
import { Pagination } from "@/components/Pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { FilterBar } from "@/components/FilterBar";
import { useAuthStore } from "@/app/store/authStore";

// 2. 실제 내용은 별도의 내부 컴포넌트로 분리
function TeamBuildContent() {
    const { allTags, allPositions, isLoading: isFilterLoading, error: filterError } = useFilterData();
    const { handleTagToggle, handlePositionChange, handleClearStacks, handleShowOpenOnlyChange, showOpenOnly } = useFilterActions();
    const user = useAuthStore((state) => state.user);
    const { data: postData, isLoading: isPostsLoading, error: postsError, params } = usePosts();

    const error = filterError || postsError;
    const isLoading = isFilterLoading || isPostsLoading;

    return (
        <div className="container mx-auto max-w-5xl py-8">
            <h1 className="font-semibold text-3xl mt-6 mb-1 tracking-tight text-foreground">Find your team</h1>
            <p className="text-muted-foreground mb-10 text-sm">Discover projects and connect with creators.</p>

            <div className="mb-8">
                {isFilterLoading ? (
                    <Skeleton className="h-32 w-full rounded-lg" />
                ) : (
                    <FilterBar
                        allPositions={allPositions || []}
                        selectedPositionId={params.position}
                        onPositionChange={handlePositionChange}
                        allTags={allTags || []}
                        selectedTagIds={params.tags}
                        onTagToggle={handleTagToggle}
                        onClearStacks={handleClearStacks}
                        showOpenOnly={showOpenOnly}
                        onShowOpenOnlyChange={handleShowOpenOnlyChange}
                    />
                )}
            </div>

            {!isLoading && error && (
                <div className="text-center py-10 text-destructive border border-dashed rounded-lg mb-4">
                    <p>Unable to load data. Please check if the backend server is running.</p>
                </div>
            )}

            {isLoading ? (
                <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-24 w-full rounded-lg" />
                    ))}
                </div>
            ) : (
                <>
                    <div className="space-y-4">
                        {postData?.content && postData.content.length > 0 ? (
                            postData.content.map((post) => (
                                <PostListItem key={post.id} post={post} />
                            ))
                        ) : (
                            <div className="text-center py-16">
                                <p className="text-muted-foreground">No projects found matching your filters.</p>
                                <p className="text-sm text-muted-foreground/80 mt-2">Try adjusting or clearing your filters.</p>
                            </div>
                        )}
                    </div>

                    {postData && postData.totalPages > 1 && (
                        <Pagination
                            totalPages={postData.totalPages}
                            className="mt-12"
                        />
                    )}
                </>
            )}
        </div>
    );
}

// 3. 메인 export 컴포넌트에서 Suspense로 감싸기
export default function TeamBuildPage() {
    return (
        <Suspense fallback={
            <div className="container mx-auto max-w-5xl py-8">
                <Skeleton className="h-12 w-48 mb-4" />
                <Skeleton className="h-32 w-full rounded-lg mb-8" />
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => <Skeleton key={i} className="h-24 w-full rounded-lg" />)}
                </div>
            </div>
        }>
            <TeamBuildContent />
        </Suspense>
    );
}
