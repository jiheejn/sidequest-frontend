"use client"

// 1. Prevent build-time prerendering errors by forcing dynamic rendering
export const dynamic = 'force-dynamic';

import { usePosts } from "@/hooks/usePosts";
import { useFilterData } from "@/hooks/useFilterData";
import { useFilterActions } from "@/hooks/useFilterActions";

// UI Components
import { PostListItem } from "@/components/PostListItem";
import { Pagination } from "@/components/Pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { FilterBar } from "@/components/FilterBar";

import { useAuthStore } from "@/app/store/authStore";

export default function TeamBuildPage() {
    // --- Custom Hooks ---
    const { allTags, allPositions, isLoading: isFilterLoading, error: filterError } = useFilterData();
    const { handleTagToggle, handlePositionChange, handleClearStacks, handleShowOpenOnlyChange, showOpenOnly } = useFilterActions();

    const user = useAuthStore((state) => state.user);
    const { data: postData, isLoading: isPostsLoading, error: postsError, params } = usePosts();

    // Combine error states
    const error = filterError || postsError;
    const isLoading = isFilterLoading || isPostsLoading;

    return (
        <div className="container mx-auto max-w-5xl py-8">
            {/* Page Header */}
            <h1 className="font-medium text-4xl mt-6 mb-2 tracking-tighter text-foreground">Find your team.</h1>
            <p className="text-muted-foreground mb-12">Discover projects and connect with creators.</p>

            {/* Filter Section */}
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

            {/* Error Message Display (Non-blocking for build) */}
            {!isLoading && error && (
                <div className="text-center py-10 text-destructive border border-dashed rounded-lg mb-4">
                    <p>Unable to load data. Please check if the backend server is running.</p>
                </div>
            )}

            {/* Post List Section */}
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

                    {/* Pagination */}
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