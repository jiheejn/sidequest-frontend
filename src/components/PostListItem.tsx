"use client"

import Link from "next/link"
import {Bookmark, Eye, MessageSquare} from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { enUS } from "date-fns/locale"
import {useState} from "react";
import {useAuthStore} from "@/app/store/authStore";
import {RecruitStatusBadge} from "@/components/RecruitStatusBadge";
import {bookmarkApi} from "@/lib/api-client";

interface PostListDto {
    id: number;
    title: string;
    recruitStatus?: 'OPEN' | 'CLOSED';
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
    isBookmarked?: boolean;
}

interface PostListItemProps {
    post: PostListDto
}

export function PostListItem({ post }: PostListItemProps) {
    const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked || false);
    const [isBookmarking, setIsBookmarking] = useState(false);
    const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true, locale: enUS });
    const user = useAuthStore((state) => state.user);

    const handleBookmarkClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!user) {
            alert("Please login to bookmark posts");
            return;
        }

        setIsBookmarked(!isBookmarked);

        try {
            await bookmarkApi.toggleBookmark(post.id);
        } catch (error) {
            setIsBookmarked(isBookmarked);
            console.error("Bookmark failed:", error);
        }
    };

    return (
        <Link href={`/posts/${post.id}`} className="block group">
            <div className="relative p-5 bg-card rounded-xl border border-border
                          transition-colors duration-200 hover:border-foreground/20">
                {/* Bookmark */}
                <button
                    onClick={handleBookmarkClick}
                    disabled={isBookmarking}
                    className="absolute top-4 right-4 p-1.5 rounded-lg
                             transition-colors hover:bg-secondary
                             disabled:opacity-50 disabled:cursor-not-allowed z-10"
                    aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
                >
                    <Bookmark
                        className={`h-4 w-4 transition-colors ${
                            isBookmarked
                                ? "fill-accent text-accent"
                                : "text-muted-foreground group-hover:text-foreground"
                        }`}
                    />
                </button>

                {/* Tags row */}
                <div className="mb-3 flex flex-wrap items-center gap-1.5 pr-10">
                    <RecruitStatusBadge status={post.recruitStatus || 'OPEN'} />
                    <span className="inline-block px-2 py-0.5 rounded-md text-xs font-medium
                                   bg-accent/10 text-accent-foreground">
                        {post.position.name}
                    </span>
                    {post.tags?.slice(0, 4).map(tag => (
                        <span key={tag.id} className="inline-block px-2 py-0.5 rounded-md text-xs
                                                     text-muted-foreground bg-secondary">
                            {tag.name}
                        </span>
                    ))}
                    {post.tags?.length > 3 && (
                        <span className="text-xs text-muted-foreground">
                            +{post.tags.length - 3}
                        </span>
                    )}
                </div>

                {/* Title */}
                <h2 className="mb-3 text-base font-semibold text-foreground leading-snug
                             line-clamp-2 group-hover:text-accent-foreground transition-colors">
                    {post.title}
                </h2>

                {/* Footer */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full overflow-hidden bg-secondary flex items-center justify-center">
                            {post.author.image ? (
                                <img
                                    src={post.author.image}
                                    alt={post.author.nickname}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <span className="text-[10px] font-medium text-foreground">
                                    {post.author.nickname[0].toUpperCase()}
                                </span>
                            )}
                        </div>
                        <span className="text-foreground/70">
                            {post.author.nickname}
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <span>{timeAgo}</span>
                        <span className="flex items-center gap-1">
                            <Eye className="h-3.5 w-3.5" />
                            {post.viewCount}
                        </span>
                        <span className="flex items-center gap-1">
                            <MessageSquare className="h-3.5 w-3.5" />
                            {post.commentCount}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}
